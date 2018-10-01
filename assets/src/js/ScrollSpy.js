/**
 * Highlights the current navigation menu item which is in view.
 *
 * Core code been taken from the vue-scrollactive module and modified — https://github.com/eddiemf/vue-scrollactive
 */

import $ from '@justeat/f-dom';
import bezierEasing from 'bezier-easing';
import throttle from 'lodash.throttle';

export default class ScrollSpy {
    constructor ({ selector }) {
        this.items = null;
        this.exact = null;
        this.observer = null;
        this.currentItem = null;
        this.lastActiveItem = null;
        this.offset = 20;
        this.activeClass = 'c-menu-link--active';
        this.duration = 600;
        this.alwaysTrack = false;
        this.bezierEasingValue = '.5,0,.35,1';
        this.modifyUrl = true;
        this.bezierEasing = bezierEasing;
        this.elem = $.first(selector);

        // Have to rebind the event handlers here so that the context is not lost and also so that
        // the events can be correctly removed — when `.bind()` is appended it creates a new function.
        this.onScrollHandler = throttle(this.onScroll.bind(this), 150);
        this.onClickHandler = this.onClick.bind(this);

        if (this.elem) {
            this.init();
        }
    }

    static getOffsetTop (element) {
        let yPosition = 0;
        let nextElement = element;

        while (nextElement) {
            yPosition += nextElement.offsetTop;
            nextElement = nextElement.offsetParent;
        }

        return yPosition;
    }

    getItemInsideWindow () {
        let currItem;
        const { pageYOffset } = window;

        this.items.forEach(item => {
            const target = document.getElementById(item.hash.substr(1));

            if (!target) return;

            const offsetTop = ScrollSpy.getOffsetTop(target);
            const isScreenPastSection = pageYOffset >= offsetTop - this.offset;
            const isScreenBeforeSectionEnd = pageYOffset < offsetTop - this.offset + target.offsetHeight;

            if (this.exact && isScreenPastSection && isScreenBeforeSectionEnd) {
                currItem = item;
            }
            if (!this.exact && isScreenPastSection) {
                currItem = item;
            }
        });

        return currItem;
    }

    removeActiveClass () {
        this.items.forEach(item => {
            item.classList.remove(this.activeClass);
        });
    }

    addActiveClass () {
        if (this.currentItem) {
            this.currentItem.classList.add(this.activeClass);
        } else {
            this.items[0].classList.add(this.activeClass);
        }
    }

    onScroll () {
        this.currentItem = this.getItemInsideWindow();

        if (this.currentItem !== this.lastActiveItem) {
            this.removeActiveClass();
            this.lastActiveItem = this.currentItem;
        }

        this.addActiveClass();
    }

    scrollTo (target) {
        return new Promise(resolve => {
            const targetDistanceFromTop = ScrollSpy.getOffsetTop(target);
            const startingY = window.pageYOffset;
            const difference = targetDistanceFromTop - startingY;
            const easing = this.bezierEasing(...this.bezierEasingValue.split(','));
            let start = null;

            const step = timestamp => {
                if (!start) start = timestamp;
                let progress = timestamp - start;
                let progressPercentage = progress / this.duration;
                if (progress >= this.duration) progress = this.duration;
                if (progressPercentage >= 1) progressPercentage = 1;
                const perTick = startingY + (easing(progressPercentage) * (difference - this.offset));

                window.scrollTo(0, perTick);

                if (progress < this.duration) {
                    this.scrollAnimationFrame = window.requestAnimationFrame(step);
                } else {
                    window.addEventListener('scroll', this.onScrollHandler);
                    resolve();
                }
            };
            window.requestAnimationFrame(step);
        });
    }

    onClick (event) {
        event.preventDefault();
        const { hash } = event.currentTarget;
        const target = document.getElementById(hash.substr(1));

        if (!target) {
            return;
        }

        /**
         *  Temporarily removes the scroll listener and the request animation frame so the active
         *  class will only be applied to the clicked element, and not all elements while the window
         *  is scrolling.
         */
        if (!this.alwaysTrack) {
            window.removeEventListener('scroll', this.onScrollHandler);
            window.cancelAnimationFrame(this.scrollAnimationFrame);

            this.removeActiveClass();
            event.currentTarget.classList.add(this.activeClass);
        }

        this.scrollTo(target).then(() => {
            if (this.modifyUrl) {
                // Update the location hash after we've finished animating
                if (window.history.pushState) {
                    window.history.pushState(null, null, hash);
                } else {
                    window.location.hash = hash;
                }
            }
        });
    }

    initScrollActiveItems () {
        this.items = $('.c-menu-link', this.elem);

        this.items.forEach(item => {
            item.addEventListener('click', this.onClickHandler);
        });
    }

    init () {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        if (!this.observer) {
            this.observer = new MutationObserver(this.initScrollActiveItems);
            this.observer.observe(this.elem, {
                childList: true,
                subtree: true
            });
        }

        this.initScrollActiveItems();
        this.removeActiveClass();
        this.currentItem = this.getItemInsideWindow();
        this.addActiveClass();

        window.addEventListener('scroll', this.onScrollHandler);
    }
}

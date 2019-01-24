/**
 * Custom JS for the documentation part of the site
 *
 * Can pull in logging modules – such as those used for the address lookup
 */

import '@justeat/f-toggle';
import $ from '@justeat/f-dom';
import './ui-components/header';
import ScrollSpy from '../ScrollSpy';

// any additional docs functionality goes in here
const docs = {
    demoBtnText: {
        whenHidden: 'Show Code',
        whenVisible: 'Hide Code'
    },
    themeBtn: null,
    themeBtnText: {
        menulogBtnText: 'Switch to JE',
        JEBtnText: 'Switch to Menulog'
    },

    // controls all of our base initialsation functions
    init: () => {
        docs._demoHandler();
        docs._disableDemoLinks();
        docs._themeHandler();
    },

    _demoHandler: () => {
        $('.demo').forEach(demoEl => {
            const codeBlock = $.first('.demo-code', demoEl);

            codeBlock.classList.add('is-hidden');

            const demoToggleBtn = document.createElement('button');

            demoToggleBtn.type = 'button';
            demoToggleBtn.classList.add('o-btn', 'o-btn--secondary', 'o-btn--codeToggle');
            demoToggleBtn.textContent = docs.demoBtnText.whenHidden;
            demoToggleBtn.addEventListener('click', docs._demoToggle);

            demoEl.insertBefore(demoToggleBtn, codeBlock);
        });

        $('.sg-sideNav .is-incomplete').forEach(el => {
            el.setAttribute('tabindex', -1);
            el.addEventListener('click', e => {
                e.preventDefault();
            });
        });
    },

    _demoToggle: event => {
        const btn = event.target;
        const codeBlock = btn.nextElementSibling;
        const isHidden = codeBlock.classList.contains('is-hidden');

        codeBlock.classList.toggle('is-hidden');
        btn.classList.toggle('is-clicked');

        if (isHidden) {
            btn.textContent = docs.demoBtnText.whenVisible;
        } else {
            btn.textContent = docs.demoBtnText.whenHidden;
        }
    },

    _disableDemoLinks: () => {
        $('.demo a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
            });
        });
    },

    // enables a rebrand toggle checkbox which switches between legacy and rebranded styling
    _themeHandler: () => {
        const toggleContainer = document.createElement('div'),
            toggleBtn = document.createElement('btn');

        toggleContainer.classList.add('sg-themeToggle');

        toggleBtn.classList.add('o-btn', 'o-btn--outline', 'sg-themeToggle-btn');
        toggleBtn.textContent = 'Switch to Menulog';
        toggleBtn.addEventListener('click', docs._themeToggle);

        toggleContainer.append(toggleBtn);
        document.body.append(toggleContainer);

        docs.themeBtn = $.first('.sg-themeToggle-btn');

        const currentTheme = docs._getTheme();
        if (currentTheme !== 'je') {
            docs._setTheme(currentTheme);
        }
    },

    _themeToggle: event => {
        const isMenulog = event.target.innerText.toLowerCase().includes('menulog');
        // if the stylesheet currently includes the Menulog prefix, change theme to JE
        if (isMenulog) {
            docs._setTheme('ml');
        } else {
            docs._setTheme('je');
        }
    },

    _getLocalStorageContext: (typeItem, name, value) => {
        if (window.localStorage) {
            return window.localStorage[typeItem](name, value);
        }
        return null;
    },

    _saveTheme: theme => {
        if (theme !== null) {
            docs._getLocalStorageContext('setItem', 'docsTheme', theme);
        }
    },

    _getTheme: () => {
        const storedTheme = docs._getLocalStorageContext('getItem', 'docsTheme');
        if (storedTheme !== null) {
            return storedTheme;
        }
        return 'je';
    },

    _setTheme: theme => {
        const stylesheet = [].slice.call(document.getElementsByTagName('link')).find(css => css.href.includes('/je'));
        const isDocsPage = stylesheet.href.includes('docs');
        const btn = docs.themeBtn;

        if (theme === 'je') {
            stylesheet.href = stylesheet.href.replace('.menulog', '');
            btn.textContent = docs.themeBtnText.JEBtnText;
            docs._saveTheme('je');
        } else {
            if (isDocsPage) {
                stylesheet.href = stylesheet.href.replace('/je-docs', '/je-docs.menulog');
            } else {
                stylesheet.href = stylesheet.href.replace('/je', '/je.menulog');
            }
            btn.textContent = docs.themeBtnText.menulogBtnText;
            docs._saveTheme('ml');
        }
    }
};

new ScrollSpy({ selector: '[data-category-menu]' }); // eslint-disable-line no-new

docs.init();

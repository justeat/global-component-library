/**
 * Custom JS for the documentation part of the site
 *
 * Can pull in logging modules – such as those used for the address lookup
 */

import $ from 'qwery';

// any additional docs functionality goes in here
const docs = {
    demoEls: $('.demo'),
    demoBtnText: {
        whenHidden: 'Show Code',
        whenVisible: 'Hide Code'
    },

    // controls all of our base initialsation functions
    init: () => {

        this._demoHandler();

    },

    _demoHandler: () => {

        const demoElCount = this.demoEls.length;

        for (let i = 0; i < demoElCount; i++) {
            const demoEl = this.demoEls[i],
                codeBlock = demoEl.querySelector('.demo-code');

            codeBlock.classList.add('is-hidden');

            const demoToggleBtn = document.createElement('a');
            demoToggleBtn.classList.add('btn', 'btn--codeToggle');
            demoToggleBtn.textContent = this.demoBtnText.whenHidden;
            demoToggleBtn.addEventListener('click', this._demoToggle);
            demoEl.insertBefore(demoToggleBtn, codeBlock);
        }

    },

    _demoToggle: () => {

        const codeBlock = this.nextElementSibling,
            isHidden = codeBlock.classList.contains('is-hidden');

        codeBlock.classList.toggle('is-hidden');

        if (isHidden) {
            this.textContent = docs.demoBtnText.whenVisible;
        } else {
            this.textContent = docs.demoBtnText.whenHidden;
        }

    }

};

docs.init();

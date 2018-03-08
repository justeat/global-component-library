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

        docs._demoHandler();

    },

    _demoHandler: () => {

        const demoElCount = docs.demoEls.length;

        for (let i = 0; i < demoElCount; i++) {
            const demoEl = docs.demoEls[i],
                codeBlock = demoEl.querySelector('.demo-code');

            codeBlock.classList.add('is-hidden');

            const demoToggleBtn = document.createElement('a');
            demoToggleBtn.classList.add('o-btn', 'o-btn--codeToggle');
            demoToggleBtn.textContent = docs.demoBtnText.whenHidden;
            demoToggleBtn.addEventListener('click', docs._demoToggle);
            demoEl.insertBefore(demoToggleBtn, codeBlock);
        }

    },

    _demoToggle: () => {

        const btn = event.target,
            codeBlock = btn.nextElementSibling,
            isHidden = codeBlock.classList.contains('is-hidden');

        codeBlock.classList.toggle('is-hidden');
        btn.classList.toggle('is-clicked');

        if (isHidden) {
            btn.textContent = docs.demoBtnText.whenVisible;
        } else {
            btn.textContent = docs.demoBtnText.whenHidden;
        }

    }

};

docs.init();

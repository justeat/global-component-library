/**
 * Custom JS for the documentation part of the site
 *
 * Can pull in logging modules – such as those used for the address lookup
 */
import $ from '@justeat/f-dom';
import './ui-components/header';


// any additional docs functionality goes in here
const docs = {
    demoBtnText: {
        whenHidden: 'Show Code',
        whenVisible: 'Hide Code'
    },

    // controls all of our base initialsation functions
    init: () => {

        docs._demoHandler();

    },

    _demoHandler: () => {

        $('.demo').forEach(demoEl => {
            const codeBlock = $.first('.demo-code', demoEl);

            codeBlock.classList.add('is-hidden');

            const demoToggleBtn = document.createElement('a');

            demoToggleBtn.classList.add('o-btn', 'o-btn--codeToggle');
            demoToggleBtn.textContent = docs.demoBtnText.whenHidden;
            demoToggleBtn.addEventListener('click', docs._demoToggle);

            demoEl.insertBefore(demoToggleBtn, codeBlock);
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

    }

};

docs.init();

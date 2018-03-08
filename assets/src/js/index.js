import ready from 'lite-ready';
import svg4everybody from 'svg4everybody';

// Fozzie imports
// import $ from '@justeat/f-dom';
// import '@justeat/f-toggle';

import '@justeat/f-header';
import '@justeat/f-footer';

import setupValidation from './docs/formValidationSetup';

ready(() => {
    svg4everybody();
    setupValidation();
});

import '@justeat/f-footer';
import { checkForUser } from '@justeat/f-header';
import ready from 'lite-ready';
import svg4everybody from 'svg4everybody';
import setupValidation from './docs/formValidationSetup';

ready(() => {
    svg4everybody();
    setupValidation();
    checkForUser();
});

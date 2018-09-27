import '@justeat/f-footer';
import { checkForUser } from '@justeat/f-header';
import { stopFoit } from '@justeat/fozzie';
import ready from 'lite-ready';
import svg4everybody from 'svg4everybody';
import setupValidation from './docs/formValidationSetup';
import 'picturefill';

ready(() => {
    stopFoit();
    svg4everybody();
    setupValidation();
    checkForUser();
});

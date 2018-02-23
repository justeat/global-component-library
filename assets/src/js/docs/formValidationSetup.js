/**
 * Runs f-validate on any forms in the docs
 * tagged with the `test-form` or `test-form-group` name
 */

import $ from '@justeat/f-dom';
import Validate from '@justeat/f-validate';

export default function setupValidation () {
    const testForms = $.all('form[name="test-form"');

    if (testForms.length > 0) {
        testForms.forEach(form => {
            const validateForm = new Validate(form);
            validateForm.addCustomValidation('customRule', field => {
                if (field.value === 'passTest') {
                    return true;
                }
                return false;
            });
            form.addEventListener('submit', e => {
                e.preventDefault();
            });
        });
    }

    const testGroupForms = $.all('form[name="test-form-group"');

    if (testGroupForms.length > 0) {
        testGroupForms.forEach(form => {
            const validateForm = new Validate(form, { // eslint-disable-line no-unused-vars
                groupErrorPlacement: 'bottom'
            });
            form.addEventListener('submit', e => {
                e.preventDefault();
            });
        });
    }
}

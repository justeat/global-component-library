import $ from '@justeat/f-dom';

$('.demo .c-countrySelector-link').forEach(country => {
    if (!country.classList.contains('c-countrySelector-link--selected')) {
        country.addEventListener('click', e => {
            e.preventDefault();
        });
    }
});

$('.demo .c-footer-icon').forEach(icon => {
    icon.addEventListener('click', e => {
        e.preventDefault();
    });
});

# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.9.2
------------------------------
*May 29, 2018*

### Updated
- Updated f-footer to 0.26.0


v1.9.1
------------------------------
*May 25, 2018*

### Updated
- Updated f-footer to 0.25.0


v1.9.0
------------------------------
*May 16, 2018*

### Added
- Privacy Policy content page added
- Added documentation for `t-trak` module

### Changed
- Tidied up some of the index pages


v1.8.0
------------------------------
*May 2, 2018*

### Added
- Documentation page on browser support added
- Documentation page on accessibility checklist added

### Changed
- Updated Colour Palette in line with new brand changes
- Updated Accessibility page links
- Comments updated to be consistent throughout SCSS files

### Fixed
- Site nav fixed on mobile devices

### Removed
- Old IE CSS file - not needed in documentation as not supporting <IE9


v1.7.0
------------------------------
*April 26, 2018*

### Changed
- Disable links to incomplete pages.
- Update styling of disabled links.
- Remove disabled links from tabindex.
- 'Show Code' buttons are now actually buttons.


v1.6.0
------------------------------
*April 26, 2018*

### Added
- Star ratings and selectable star ratings documentation


v1.5.0
------------------------------
*April 25, 2018*

### Added
- Import `f-footer` in `docs/index.js`.
- `docs/ui-components/footer.js`.

### Changed
- Use footer handlebars templates.
- Updated dependencies:
    - `f-footer`
    - `f-header`
    - `f-icons`
    - `f-toggle`
    - `f-validate`
    - `fozzie`
- Disable the default on-click behaviour of all anchors within demo blocks.


v1.4.0
------------------------------
*April 11, 2018*

### Added
- Added documentation for developing shared HTML templates.


v1.3.0
------------------------------
*April 11, 2018*

### Added
- Added shared header templates to UI Components section.
- Added shared header documentation JavaScript to display header examples in correct state.

### Changed
- Updated `gulp-build-fozzie` version.
- Updated `f-header` version.
- Updated `.gitignore` file.
- Small refactor of the main documentation module.

### Fixed
- Fixed lint issues in `gulpfile.js`.
- Fixed JavaScript issue when toggling code demo elements.


v1.2.0
------------------------------
*March 21, 2018*

### Added
- Dangerfile and travis build configs added

### Fixed
- Fixed baseUrl links for push to `gh-pages`
- Fixed link to radio and checkbox partials


v1.1.0
------------------------------
*March 19, 2018*

### Added
- Checkbox and Tickbox documention added
- Radio button documentation added

v1.0.1
------------------------------
*March 16, 2018*

### Fixed
- Remote links for assets and page links fixed to use the correct `baseUrl`


v1.0.0
------------------------------
*March 15, 2018*

### Changed
- Updated to v1 release and squashed history

v0.12.0
------------------------------
*March 5, 2018*

### Added
- Listing Element documentation added


v0.11.0
------------------------------
*February 26, 2018*

### Added
- Documentation page for the `f-validate` component added
- Documentation helpers for initialising example forms added

### Changed
- Code highlighting updated to Prism v1.11
- Updated package dependencies


v0.10.0
------------------------------
*February 22, 2018*

### Added
- Media Element documentation added


v0.9.0
------------------------------
*February 19, 2018*

### Added
- Search page mock up
- placeholder template + css

### Changed
- Breadcrumb html example


v0.8.0
------------------------------
*February 8, 2018*

### Added
- Logo! :bear:
- Dangerfile.js usage documented
- License added

### Changed
- Package dependencies updated
- Gitignore updated (to the fozzie standard definition)
- Moved images into better folder structure
- Bumped up the documentation font-size (as was a bit small for large amounts of documentation text)


v0.7.0
------------------------------
*January 29, 2018*

### Changed
- Updated `browserlist` in `package.json`
- Updated to use `babel-preset-env`
- Updated codeblock styling
- Changed how docs JS is referenced


v0.6.0
------------------------------
*September 15, 2017*

### Added
- Documentation for static content page added
- Documentation for default header component added
- Incomplete attribute added for pages so we can see which pages are most up to date


### Changed
- Documentation CSS now sorted out properly (lots of removals and additions)
- JS docs specific file added to compilation task
- Header code blocks tidied up
- Adding `.u-unstyled` class to lists in documentation
- Updated CHANGELOG


v0.5.0
------------------------------
*September 6, 2017*

### Added
- Documentation for default footer added to documentation


v0.4.0
------------------------------
*August 31, 2017*

### Added
- Documentation for button styles


v0.4.0
------------------------------
*August 31, 2017*

### Added
- Documentation for button styles


v0.3.0
------------------------------
*August 9, 2017*

### Added
- Documentation for the colour palette and variables available in fozzie.
- Copy config for `modernizr` and `prism.js`

### Changed
- Updated package dependencies for `gulp-build-fozzie`

### Removed
- Sections for design/brand info.  Can add sections like this in later if deemed necessary by design team.


v0.2.0
------------------------------
*July 26, 2017*

### Changed
- Stripped back repo so that the `scss` is only what is needed and pulls it’s base styles from the `fozzie` module.
- Updated the documentation html to match that of the base styles in fozzie.
- Updated package dependencies for gulp tasks


v0.1.0
------------------------------
*June 13, 2017*

### Added
- Proof of concept at this stage for the documentation repository for fozzie.
- Includes base structure of module and repository as well as


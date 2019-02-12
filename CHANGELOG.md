# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v2.17.0
------------------------------
*February 12, 2019*

### Fixed
- Updated link to Menulog fonts in SCSS build


v2.16.0
------------------------------
*February 11, 2019*

### Changed
- Package updates
- Small changes for Cuisines Widget component


v2.15.0
------------------------------
*January 24, 2019*

### Added
- Cookie banner component page


v2.14.0
------------------------------
*December 17, 2018*

### Changed
- Typography updated to latests designs


v2.13.0
------------------------------
*December 14, 2018*

### Added
- 'Content Standards' MoSCoW priorities migrated from wiki


v2.12.0
------------------------------
*December 14, 2018*

### Added
- `c-orderCard` component

### Changed
- `fozzie` module version update


v2.11.0
------------------------------
*December 6, 2018*

### Added
- `c-appsBanner` component

### Changed
- `fozzie` module version update


v2.10.0
------------------------------
*December 5, 2018*

### Added
- `c-cuisinesWidget` component

### Changed
- `fozzie` module version update


v2.9.0
------------------------------
*November 28, 2018*

### Fixed
- Issues with sub-folders caused by breaking build (svg includes)


v2.8.0
------------------------------
*November 20, 2018*

### Added
- Added local legend icons.


v2.7.0
------------------------------
*November 20, 2018*

### Changed
- `c-pageBanner` component become more reusable
- Package updates for `fozzie`, `f-icons`, `f-footer`

### Added
- zIndex for `sg-themeToggle`


v2.6.0
------------------------------
*November 20, 2018*

### Added
- CSS utilities documentation


v2.5.0
------------------------------
*November 6, 2018*

### Changed
- UI-components icons to be called from svg sprite to improve "Show code" behaviour

### Added
- Social icons to UI icons component examples


v2.4.0
------------------------------
*November 2, 2018*

### Changed
- Package updates for `f-footer`, `f-icons`, `f-header`, `fozzie`


v2.3.0
------------------------------
*October 23, 2018*

### Added
- Section added in CSS docs on how to apply themes to fozzie components (and explaining how the solution works technically).

### Changed
- Minor package updates


v2.2.0
------------------------------
*October 19, 2018*

### Added
- Added new page to 'General' section explaining what Fozzie is.  Have moved some of this content out of the CSS section as it was relevant to all aspects of the components.

### Changed
- Package updates for `fozzie`, `f-header`, `f-footer`, `f-icons`


v2.1.0
------------------------------
*October 5, 2018*

### Added
- Include optional `c-toast` Fozzie component.
- Menu layouts for each menu type variation.

### Changed
- Updated `ScrollSpy` module to apply new active CSS class.
- Sorted components into the correct categories following Fozzie v1 release.
- Minimum required Node version changed to `>=6.0.0`.

### Fixed
- Only include prism JS file when a page has been tagged as `docs`.


v2.0.0
------------------------------
*October 3, 2018*

### Added
- Menulog theme switching support. `sg-themeToggle` added which adds a button to the bottom right of the screen to toggle between JE & Menulog themes.
- Added the Menulog theme switch into the SCSS so that we now generate two CSS files – one for the base JE theme and one for Menulog

### Changed
- Updated to Fozzie v1.1.0
- Updated so that it works with Babel v7
- A number of other minor package updates

### Removed
- Legacy button components no longer needed in Fozzie.


v1.31.0
------------------------------
*September 27, 2018*

### Added
- Picturefill polyfill.

### Changed
- Menu layout using transparent header and new font loading changes have been applied.


v1.30.0
------------------------------
*September 26, 2018*

### Added
- Added Fozzie stopFOIT preload font classes to body.

### Changed
- Update `c-badge` docs with new a11y changes to divider.


v1.29.0
------------------------------
*September 14, 2018*

### Added
- Scroll spy module.
- Lodash throttle module.

### Changed
- Updated menu layouts.


v1.28.0
------------------------------
*September 12, 2018*

### Changed
- Added `c-badge--transparent` modifier.


v1.27.0
------------------------------
*September 11, 2018*

### Changed
- Added padlock and collectionBag icon.


v1.26.0
------------------------------
*September 11, 2018*

### Changed
- Updated ratings modifier.


v1.25.0
------------------------------
*September 11, 2018*

### Added
- Added new ratings modifier.


v1.24.0
------------------------------
*September 10, 2018*

### Added
- Added offers to menu layouts.
- New card modifier examples.

### Fixed
- Code elements will display on a single line rather than wrap across two lines.
- Badge link URL case.


v1.23.0
------------------------------
*September 7, 2018*

### Added
- Added restaurant note layout
- Run prepare scripts using `concurrently` module.

### Changed
- Menu layout updated.
- Updated footer layout to match most recent version.
- Updated Travis config.
- Updated npm dependencies.

### Fixed
- Menu layout grid columns set correctly for all screen sizes.


v1.22.1
------------------------------
*September 5, 2018*

### Changed
- Show popular icon on the menu example layout.


v1.22.0
------------------------------
*September 5, 2018*

### Added
- Menu documentation.
- Code is linted when the `prepare` hook is fired.

### Changed
- Updated Travis config to run using Node v8 & v10.


v1.21.0
------------------------------
*September 5, 2018*

### Added
- Added new `c-badge` modifier - `c-badge--noPad`.
- Added `c-badge--noPad` examples.


v1.20.0
------------------------------
*September 3, 2018*

### Added
- Added new `c-badge` modifiers.
- Added more `c-badge` examples.
- Added more menu header variations.

### Changed
- Menu header layout updated to include tags.
- Restaurant listings now using `c-badge` component.
- Updated Fozzie dependency.


v1.19.0
------------------------------
*August 31, 2018*

### Changed
- Menu grid layout updated.
- Updated project dependencies.
- Updated style guide styles.
- Components pages using correct layout.

### Fixed
- Menu layout ratings count now displayed.
- Menu layout accessible text is now displayed correctly.
- Order of SCSS dependencies.
- Icons sub-nav link.

### Removed
- Multilingual class from `html` tag.


v1.18.0
------------------------------
*August 29, 2018*

### Added
- Page Banner documentation.
- Icon documentation.
- Ability to specify a visual docs demo CSS class.
- Docs visual spacing bottom CSS class.

### Changed
- Reordered component subnav items.
- Tweaks to the sentence order of the cards and badges documentation.
- Component index split across three columns.
- Menu template using new `je-pagebanner` partial.
- Updated project dependencies.


v1.17.0
------------------------------
*August 28, 2018*

### Added
- Added restaurant listing with distance information
- Added restaurant listing offline variation
- Added restaurant listing container component

### Changed
- Amended markup to standard restaurant listing
- Amended markup to listing item meta block


v1.16.0
------------------------------
*August 28, 2018*

### Added
- Full page menu template.
- Examples of the variations of a menu header.


v1.15.0
------------------------------
*August 28, 2018*

### Added
- JavaScript sections on testing, codestyle, frameworks, modules all added.

### Changed
- WIP banner text updated to be more informative
- Organised UI Components links better


v1.14.0
------------------------------
*August 22, 2018*

### Added
- `c-badge` component documentation.


v1.13.0
------------------------------
*August 22, 2018*

### Added
- `c-card` component documentation.


v1.12.0
------------------------------
*August 21, 2018*

### Added
- CODEOWNERS file added
- PR Template added

### Updated
- Development Principles docs page up-to-date
- Getting Started docs page up-to-date
- Gulp docs page up-to-date


v1.11.0
------------------------------
*August 16, 2018*

### Added
- Sass docs page added
- Fozzie docs page added

### Updated
- CSS Principles docs page now up-to-date
- CSS Naming Scheme docs page now up-to-date
- CSS Structure docs page now up-to-date
- Footer for documentation pages added to the site
- Updating navigation and homepage with more accurate/useful descriptions
- Changed `max-width` of content docs to be a more sensible line-length

### Fixed
- UI Components page fixed to include current UI Components
- `espree` added to resolutions to fix ESLint dependency issue

### Removed
- gift `resolutions` value for `fozzie-colour-palette` no longer needed
- Removed markup from base design elements page (as not needed)


v1.10.0
------------------------------
*July 11, 2018*

### Added
- `CNAME` file added to copy task so that the friendly url doesn't get overwritten on deploy

### Updated
- Privacy policy template updated in line with new markup changes

### Fixed
- Included `resolutions` option to `package.json` to ensure version of `gift` installed is up-to-date and doesn't break the build.


v1.9.3
------------------------------
*May 29, 2018*

### Updated
- Fix Travis build issue with new version


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

///////////////////////////////////////////////////////////
// Task Dependencies

const browserSync = require('browser-sync'),
      gulp        = require('gulp'),
      config      = require('../config');

const docsDistDir = config.docs.rootDir + config.docs.distDir;

///////////////////////////////////////////////////////////


/**
 * Syncs any changes to the docs HTML or CSS to our browser, without the need to refresh
 */
gulp.task('browserSync:docs', ['assemble'], function () {
    browserSync.init({
        files: [
            `${docsDistDir}/**/*.html`,
            `${docsDistDir}/assets/**/*.css`
        ],
        server: {
            baseDir: docsDistDir,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        reloadDebounce: 1000 // debounce our reloads by a second, to avoid multiple un-needed syncs
    });
});

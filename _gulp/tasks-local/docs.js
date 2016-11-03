///////////////////////////////////////////////////////////
// Task Dependencies

const gulp    = require('gulp'),
      config  = require('../config'),
      runSequence  = require('run-sequence'),

      ghPages = require('gulp-gh-pages');

const docsDistDir = config.docs.rootDir + config.docs.distDir;

///////////////////////////////////////////////////////////


/**
 * Runs all tasks to run the documentation site locally
 * 1. Cleans the documentation folder
 * 2. Watches documentation files for changes
 * 3. Generates the documentation files and syncs any changes into the browser
 */
gulp.task('docs', function (cb) {

    runSequence(
        ['clean:docs'],
        ['watch'],
        // ['scripts:docs'],
        ['browserSync:docs'],
    cb);

});

/**
 * Runs all tasks to deploy the site to ghPages
 * 1. Cleans the documentation folder
 * 2. Runs the default task and generates a production build of the documentation
 * 3. Releases the build to ghPages branch of our repo
 */
gulp.task('docs:deploy', function (cb) {

    runSequence(
        ['clean:docs'],
        ['default', 'assemble:prod'],
        // ['scripts:docs'],
        ['docs:release'],
    cb);

});

/**
 * Pushes the current build to ghPages branch of repo
 */
gulp.task('docs:release', function () {
    return gulp.src(docsDistDir + '/**/*')
        .pipe( ghPages() );
});

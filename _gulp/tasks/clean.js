///////////////////////////////////////////////////////////
// Task Dependencies

const gulp    = require('gulp'),
      config  = require('../config'),

      del     = require('del');

///////////////////////////////////////////////////////////

const docsDistDir = config.docs.rootDir + config.docs.distDir;

/**
 * Cleans out CSS files ready to be rebuilt
 */
gulp.task('clean:css', function () {

    return del([
        config.css.distDir + '/**/*',
        config.docs.rootDir + config.docs.distDir + config.css.cssDir + '/**/*.min.css'
    ]);

});

/**
 * Cleans out generated documentation files
 */
gulp.task('clean:docs', ['clean:assetManifest'], function () {
    return del([
        `${docsDistDir}/**/*`,
        `!${docsDistDir}/{assets,assets/**,assets/**/*.*}`
    ]);
});

/**
 * cleans references to cachebusted file references in the docs (used in handlebars to reference files)
 */
gulp.task('clean:assetManifest', function () {
    return del([ `${docsDistDir}/rev-manifest.json` ]);
})

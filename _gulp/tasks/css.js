///////////////////////////////////////////////////////////
// Task Dependencies

var gulp          = require('gulp'),
    config        = require('../config'),
    plumber       = require('gulp-plumber'),
    gulpif        = require('gulp-if'),
    rename        = require('gulp-rename'),
    filesizegzip  = require('filesizegzip'),
    tap           = require('gulp-tap'),

    sass          = require('gulp-sass'),
    eyeglass      = require('eyeglass'),
    cssnano       = require('cssnano'),
    sourcemaps    = require('gulp-sourcemaps'),
    postcss       = require('gulp-postcss'),
    scss          = require('postcss-scss'),
    assets        = require('postcss-assets'),
    stylelint     = require('stylelint'),
    reporter     = require('postcss-reporter'),
    autoprefixer  = require('autoprefixer'),
    rev           = require('gulp-rev');

///////////////////////////////////////////////////////////


/**
 * css:lint Task
 * -------------
 * Uses our config rules set in .stylelintrc to validate syntax and structure of the CSS
 *
 */
gulp.task('css:lint', function () {

    return gulp.src([ `${config.css.srcDir}/**/*.scss` ])
        .pipe(
            postcss([
                stylelint(),
                reporter({
                    clearMessages: true,
                    throwError: true
                })
            ],
            { syntax: scss })
        );

});


/**
 * css:prod Task
 * -------------
 * Ovewrites config vars to act replicate production compilation
 * Then runs CSS Task
 *
 */
gulp.task('css:prod', function () {
    config.isProduction = true;

    gulp.start('css');
});


/**
 *  css Task
 *  -------------
 *  Removes old CSS from dist folders, runs the css:lint task
 *  Then compiles the CSS – using PostCSS and Sass
 *
 * Will produce 3 files per Sass input
 * 1. A compiled CSS file (non-minified so can check compiled code)
 * 2. A compiled & minified CSS file (for use in the docs)
 * 3. A compiled, minified & versioned CSS file (used by .Net and production)
 *
 */
gulp.task('css', ['clean:css', 'css:lint'], function () {

    return gulp.src([ `${config.css.srcDir}/**/*.scss` ])
        .pipe( plumber( config.gulp.onError ) ) // stops watch from breaking if an error occurs

        .pipe( gulpif(!config.isProduction, sourcemaps.init()) ) // if sourcemaps are switched on in the config, initialise them

        // compile using Sass & initialising eyeglass modules
        .pipe(
            sass( eyeglass() )
        )

        .pipe(
            postcss([
                assets({ loadPaths: [ config.img.srcDir ] }), // Converts any specified assets to data URIs
                autoprefixer({ browsers: config.css.autoprefixer }) // Autoprefixes CSS properties for various browsers
            ])
        )

        // output unminifed + sourcemapped CSS – used in debug mode of Visual Studio
        .pipe( gulp.dest(config.css.distDir) )

        // Compress CSS
        .pipe(
            postcss([ cssnano() ])
        )

        .pipe( //add .min suffix to CSS files
            rename({
                suffix: ".min"
            })
        )

        // Output file-size
        .pipe(
            gulpif(config.misc.showFileSize,
                tap(file => {
                    console.log(`❯❯ Minified CSS ${file.relative}`, filesizegzip(file.contents, true));
                })
            )
        )

        .pipe( gulpif( !config.isProduction, sourcemaps.write(undefined, { sourceRoot: null })) ) // if not in production, add sourcemaps to our compiled CSS


        .pipe( gulp.dest(config.docs.rootDir + config.docs.distDir + config.css.distDir) )


        .pipe( gulpif( !config.isProduction, sourcemaps.write(undefined, { sourceRoot: null })) ) // if not in production, add sourcemaps to our compiled CSS

        .pipe( rev() ) // revision control for caching

        // output to destination CSS folder and the docs assets folder
        .pipe(gulp.dest(config.css.distDir));

});

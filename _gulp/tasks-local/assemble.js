///////////////////////////////////////////////////////////
// Task Dependencies

const gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      path        = require("path"),
      debug       = require('gulp-debug'),
      plumber     = require('gulp-plumber'),
      browserSync = require('browser-sync'),
      newer       = require('gulp-newer'),
      config      = require('../config'),

      assemble    = require('assemble'),
      expand      = require('expand')(),
      extname     = require('gulp-extname');

///////////////////////////////////////////////////////////

// setup full paths to docs folders
const docsSrcDir = config.docs.rootDir + config.docs.srcDir,
    docsDistDir = config.docs.rootDir + config.docs.distDir,
    docsTmplDir = docsSrcDir + config.docs.tmplDir,
    docsDataDir = docsSrcDir + config.docs.dataDir,
    docsHelperDir = `../.${docsSrcDir}${config.docs.helperDir}`;

// initialise assemble – our documentation generator
const app = assemble();

app.helper('is', require(`${docsHelperDir}/helper-is.js`));
app.helper('exists', require(`${docsHelperDir}/helper-exists.js`));
app.helper('toLowerCase', require(`${docsHelperDir}/helper-toLowerCase.js`));
app.helper('markdown', require('helper-markdown'));


gulp.task('assemble', () => {

    //init assemble plugins
    app.enable('debugEngine');
    app.layouts(`${docsTmplDir}/layouts/*.{md,hbs}`);
    app.partials(`${docsTmplDir}/includes/**/*.{md,hbs}`);
    app.data(`${docsDataDir}/*.{json,yml}`);
    app.data('./package.json', { namespace: true });
    app.option('layout', 'default');

    app.data({
        baseUrl: (config.docs.isProd ? '/UI/global-component-library' : '')
    });

    // pre-render any data <%= variable %> declarations in the yml front-end matter
    app.preRender(/\.(hbs|html)$/, function (view, next) {
      view.data = expand(view.data, app.cache.data);
      next();
    });

    return app.src(`${docsTmplDir}/pages/**/*.{md,hbs}`)
            .pipe( plumber( config.gulp.onError ) ) // stops watch from breaking on error
            .pipe( newer( {
                dest: docsDistDir,
                ext: '.html'
             }) )
            .pipe( debug() )
            .pipe( app.renderFile() )
            .pipe( extname() )
            .pipe( app.dest(docsDistDir) )
            .pipe( browserSync.stream({once: true}) ); // stream result to browsersync stream once rendered

});


gulp.task('assemble:prod', function () {

    //ovewrite config vars to act like a production task as that is what is being requested
    config.docs.isProd = true;
    gulp.start('assemble');

});

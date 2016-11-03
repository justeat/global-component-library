///////////////////////////////////////////////////////////
// Task Dependencies

var gulp     = require('gulp'),
    config   = require('../config');

///////////////////////////////////////////////////////////

gulp.task('watch', ['default'], function () {

    /** WATCHES CSS FILES */
    gulp.watch( `${config.css.srcDir}/**/*.scss`, ['css']);

    /** WATCHES JS FILES */
    // watches ES6 script changes
    // gulp.watch( `${config.js.srcDir}/es6/docs/**`, ['scripts:docs']);

    // gulp.watch([
    //     `${config.js.srcDir}/**`,
    //     `!${config.js.tests.srcDir}/**`,
    //     `!${config.js.srcDir}/es6/docs/**`,
    // ],
    // ['scripts']);

    /** WATCHES DOCUMENTATION FILES */
    // be careful with the paths here – must be relative, using 'cwd' attribute to specify root
    // otherwise it won’t recompile when newly created files are added to a directory while running the watch
    gulp.watch(`${config.docs.srcDir}/**/*.{md,hbs}`, { cwd: config.docs.rootDir }, ['assemble']);
});

gulp.task('watch:tests', ['scripts:tests'], function () {

    /** WATCHES JS TESTS */
    gulp.watch( config.js.tests.srcDir + '/**', ['scripts:tests']);

});

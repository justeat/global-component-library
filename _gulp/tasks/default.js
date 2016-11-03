///////////////////////////////////////////////////////////
// Task Dependencies

var gulp = require('gulp'),
    runSequence = require('run-sequence');

///////////////////////////////////////////////////////////

gulp.task('default', function (callback) {
    runSequence(
        /*['copy:fonts', 'copy:images'],*/
        ['css'/*, 'scripts'*/],
        callback);
});

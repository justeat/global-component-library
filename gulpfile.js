/// <binding ProjectOpened='watch' />
/// <vs SolutionOpened='default' />
/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

const gulp = require('gulp');
const build = require('@justeat/gulp-build-fozzie');

gulp.tasks = build({
    css: {
        srcDir: 'assets/src/scss',
        distDir: 'assets/dist/css'
    },
    js: {
        srcDir: 'assets/src/js',
        srcFile: 'index.js',
        distDir: 'assets/dist/js'
    }
});

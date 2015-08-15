// This file registers the default gulp task.  The default task is what
// is run when a user executes "gulp" from the commandline.


// Grab the gulp module itself
var gulp = require('gulp');

// Register the "default" task.  In our case, this just calls one other
// task: 'watch'.  This is found in ./tasks/watch.js
gulp.task('default', ['watch']);
// This file sets up the "watch" task.  This task looks at the filesystem
// (in particular, the files listed in the config.watch object found in
// ../config.js) and, if the change occurred on a server file: restarts the
// server, if the change occurred on a client file: recompiles the client
// source code using browserify.


// Grab a handle to gulp
var gulp = require('gulp');

// Load up the configuration (eg: the files to watch)
var config = require('../config');

// This is the watch task itself.
var watchTask = function () {
	gulp.watch(config.watch.serverFiles, ['server']);
	gulp.watch(config.watch.clientFiles, ['browserify']);
};

// Register the task.  This names the task ('watch'), specifies dependencies
// ('server' and 'browserify' tasks, so that they are run once before the
// watch begins) and registers the handler function.
gulp.task('watch', ['server', 'browserify'], watchTask);

// Export our task in case anybody else ever wants to use it.
module.exports = watchTask;
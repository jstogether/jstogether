// This file sets up the "browserify" task.  This task compiles the client
// source code together into a single bundle.js file, generates sourcemaps
// (so that when an error occurs the console will point to the correct source
// file instead of some random line in the compiled bundle.js file - which is
// pretty unhelpful), and pipes the bundled source to the output file.


// This module is our main taskrunner.
var gulp = require('gulp');

// This module compiles the client-side source together (following all the
// require()'s) into a single payload and adds sourcemaps, then outputs it
// to a file.
var browserify = require('browserify');

// This module allows us to make the browserify output stream "gulp-compatible".
var stream = require('vinyl-source-stream');

// This file contains our configuration for browserify.
var config = require('../config').browserify;

// This is the function that will be called whenever the "browserify" task is
// triggered by the "watch" task.  The watch task can be found at ./watch.js  
var browserifyTask = function () {
    // Initialise browserify and tell it where to start
    var b = browserify(config);
    
    // This function will perform the actual bundling and pipe the source
    // through to the output.
    var bundle = function () {
        return b.bundle()
            .pipe(stream(config.outputFilename))
            .pipe(gulp.dest(config.outputPath));
    };
    
    // Whenever browserify detects an update, re-bundle everything.
    b.on('update', bundle);
    
    // Perform the initial bundling.
    return bundle();
};

// Register the actual task with gulp
gulp.task('browserify', browserifyTask);

// Export our task in case anybody else ever wants to use it.
module.exports = browserifyTask;
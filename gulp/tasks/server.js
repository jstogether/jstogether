// This file sets up the "server" task, which automatically restarts
// the server whenever our server-side source code changes.


// Grab a handle to gulp
var gulp = require('gulp');

// This provides a .log() function that lets us output tidy, coloured messages
// to the node console.
var gUtil = require('gulp-util');

// This is a node module that allows us to create child processes.  We use it
// for executing the "node" process from within the "gulp" process.
var spawn = require('child_process').spawn;

// This stores the current state of the server:
// 0: Server is not running
// 1: Server is running
// 2: Server has crashed
// 3: Server is shutting down
var state = 0;

// This is an array of coloured strings to output at each state.
var states = [
	gUtil.colors.gray.bgBlue('Starting'),
	gUtil.colors.gray.bgYellow('Restarting'),
	gUtil.colors.gray.bgCyan('Crashed'),
	gUtil.colors.gray.bgRed('Exiting')
];

// This stores our node process.
var node;

// Helper function for easily logging the message needed at the current state
var log = function () {
	gUtil.log(states[state]);
};

// This is the "server" task itself.  This will handle restarting the server
// whenever triggered by the "watch" task.  The watch task can be found at
// ./watch.js
var serverTask = function () {
	if (node) {
		// We already have a running node process.  Kill it.
		state = 1;
		node.kill();
	}
	
	// Fire out some nice, friendly feedback.
	log();

	// Spawn a new node instance and keep track of it.
	node = spawn('node', ['server.js'], {
	    stdio: 'inherit'
	});

	// Add a handler to the process that will change the state and log a\
	// message when the process is closed.
	node.on('close', function (errCode) {
		if (errCode === 8) {
			state = 2;
			log();
		}
	});
};

// Kill any running node process and log a friendly message when the gulp
// process is exiting.
process.on('exit', function () {
	state = 3;
	log();
	if (node) node.kill();
});

// Register the "server" task with Gulp
gulp.task('server', serverTask);

// Export our task in case anybody else ever wants to use it.
module.exports = serverTask;
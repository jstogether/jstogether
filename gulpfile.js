// This is the main configuration file loaded by the NPM module "gulp".


// This module calls "require" recursively on an entire directory of files
var requireDir = require('require-dir');

// Load up all the gulp tasks
requireDir('./gulp/tasks', {
    recurse: true
});
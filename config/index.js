var nconf = require('nconf');
var path = require('path');
var filename;

if (process.env.NODE_ENV) {
	filename = 'config-' + process.env.NODE_ENV + '.json';
}
else {
	console.warn('Environment Variable NODE_ENV not set - using default config');
	filename = 'config-dev.json';
}

nconf.file(path.join(__dirname, filename));

module.exports = nconf;
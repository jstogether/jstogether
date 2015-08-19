// Register babel transpiler so ES6 modules can be imported
require('babel-core').register();

var path = require('path');
var express = require('express');
var app = express();
var config = require('./config');

var host = config.get('server:host');
var port = config.get('server:port');

var db = require('./db');
app.use(express.static(path.join(__dirname, 'public'), {
	index: false
}));

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

require('./middleware')(app);
require('./router')(app);

module.exports = app.listen(port, host, function () {
	console.log('Listening! ', host + ':' + port);
});
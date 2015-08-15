/**
 * Created by Joshua on 8/15/2015.
 */

var express = require('express');
var app = express();

//app.set('port', (process.env.PORT || 8085))

app.use(express.static(__dirname + '/client'));

app.get('/', function(request, response) {
    response.render('/client/index.html')
});

app.listen('8081','0.0.0.0', function(){
    console.log('Listening on port 8081');
});
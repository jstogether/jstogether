/**
 * Created by Joshua on 8/15/2015.
 */

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000))

app.use(express.static(__dirname + '/client'));

app.get('/', function(request, response) {
    response.render('/client/index.html')
});

app.listen(app.get('port'), function(){
    console.log('Listening on port ', app.get('port'));
});
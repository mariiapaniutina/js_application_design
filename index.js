var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/build'));
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('index.html');
  response.sendfile(__dirname + '/index.html');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
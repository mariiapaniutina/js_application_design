var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/build')); //sourcemap will not work, because of src/js is private.. will think about that...
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('index.html');
  response.sendfile(__dirname + '/index.html');
});

app.listen(process.env.PORT);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
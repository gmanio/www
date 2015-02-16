var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www/view'));
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/img', express.static(__dirname + '/www/img'));

app.get('/', function(req, res){
    res.sendFile('index.html');
});

app.listen(7777);
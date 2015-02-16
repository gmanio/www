var express = require('express');
var app = express();
var DBconnection = require('sDB/mysql.js');

app.use(express.static(__dirname + '/www/view'));
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/img', express.static(__dirname + '/www/img'));

app.get('/', function(req, res){
    DBconnection.connectionInfo(req.ip , req.get('user-agent'));
    res.sendFile('index.html');
});

app.listen(7777);
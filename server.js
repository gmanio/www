var express = require('express');
var app = express();
var mysql = require('./module/mysql.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/view', express.static(__dirname + '/www/view'));
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/img', express.static(__dirname + '/www/img'));

app.get('/', function(req, res){
    mysql.sendConnectQuery(req.ip, req.get('user-agent'));
    var options = {
        root: __dirname + '/www/view/'
    };
    res.sendFile('index.html', options);
});

app.get('/socket', function(req, res){
    var options = {
        root: __dirname + '/www/view/'
    };
    res.sendFile('socket.html', options);
});

app.listen(7777);
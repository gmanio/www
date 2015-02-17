var express = require('express');
var app = express();
var mysql = require('mysql');
var dbPool = require('./module/mysql.js');
var conn = new dbPool(mysql);

app.enable('trust proxy');
app.use('/view', express.static(__dirname + '/www/view'));
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/img', express.static(__dirname + '/www/img'));

app.get('/', function(req, res){
    conn.sendConnectQuery(req.ip, req.get('user-agent'));
    var options = {
        root: __dirname + '/www/view/',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendfile('index.html', options);
});

app.listen(7777);
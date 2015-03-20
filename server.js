var express = require('express');
var app = express();
/*var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: false, parameterLimit: 10000, limit: 1024 * 1024 * 10}));
app.use(bodyParser.json({extended: false, parameterLimit: 10000, limit: 1024 * 1024 * 10}));

app.use(express.static(__dirname + '/www/view'));
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/img', express.static(__dirname + '/www/img'));

app.get('/', function(req, res){
    var options = {
        root: __dirname + '/www/view'
    }
    res.sendFile('index.html',options);
})

app.get('/stock', function(req, res){
    var options = {
        root: __dirname + '/www/view'
    }
    res.sendFile('stock.html',options);
})

app.post('/stockData', function(req, res){
    MongoClient.connect('mongodb://go.gman.io:27017/local', function(err, db) {
        if(err) throw err;

        var data = JSON.parse(req.body.data);
        
	var collection = db.collection('stock');
        
	collection.save(data, function(){
            console.log('saved');
        })

        setTimeout(function(){
                collection.find().toArray(function(err, results) {
                    db.close();
                })
        },500)
    })

})

app.get('/getJSON', function(req,res){
    MongoClient.connect('mongodb://go.gman.io:27017/local',
        function(err, db) {
            if (err) throw err;
            var collection = db.collection('stock');
            collection.find().toArray(function(err, results) {
                // Let's close the db
                res.status(200).json(results);
                db.close();
            });
        }
    )
})

app.listen(7777);

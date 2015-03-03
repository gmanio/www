

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://go.gman.io:27017/local', function(err, db) {
    if(err) throw err;

    var collection = db.collection('connect_info');
    collection.insert({a:2}, function(err, docs) {

        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });

        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
            console.dir(results);
            // Let's close the db
            db.close();
        });
    });
})

module.exports = 
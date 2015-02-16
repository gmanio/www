var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'go.gman.io',
    user     : 'root',
    password : 'odroid',
    database : 'test'
});

var DBconnection = function(connection){
    this.connection = connection;
}

DBconnection.prototype = {
    connectionInfo: function(ip, ua){
        var info = {'ip':ip, 'ua':ua};
        this.preparedStatement('INSERT INTO test.connection SET ? ?', info);
    },
    preparedStatement: function(sql, inserts){
        this.connection.connect(this.cb(err));
        this.connection.query(sql, inserts, function(err,result){
            if(err){
                this.cb(err);
            }
            console.log(result);
        })
        this.connection.destroy();
    },
    sendQuery: function(query){
        this.connection.connect(this.cb(err));
        this.connection.query(query, function(err,result){
            if(err){
                this.cb(err);
            }
            console.log(result);
        })
        this.connection.destroy();
    },
    cb: function(err){
        console.log(err);
    }
}

module.exports = DBconnection;
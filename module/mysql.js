var DBconnection = function(mysql){
    this.pool = mysql.createPool({
        host     : 'go.gman.io',
        user     : 'root',
        password : 'odroid'
    });
    this.pool.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });
}

DBconnection.prototype = {
    sendConnectQuery: function(ip, userAgent){
        var conn = this.pool;

        conn.query('INSERT INTO test.connection SET ?', {'ip':ip, 'ua':userAgent},
            function(err, result){
                if(err) throw err;
                console.log(result);
            }
        )
    }
}

module.exports = DBconnection;
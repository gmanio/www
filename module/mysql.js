
DBConnect = function(mysql){
    this.pool = mysql.createPool({
        host     : 'go.gman.io',
        user     : 'root',
        password : 'odroid'
    });
    this.pool.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });
}

DBConnect.prototype = {
    sendConnectQuery: function(ip, userAgent){
        this.pool.query('INSERT INTO test.connection SET ?', {'ip':ip, 'ua':userAgent},
            function(err, result){
                if(err) throw err;
            }
        )
    }
}

module.exports = new DBConnect(require('mysql'));

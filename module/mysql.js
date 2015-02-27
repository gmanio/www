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
http://api.seibro.or.kr/openapi/service/StockSvc/getStkIsinByNm?secnNm=삼성&numOfRows=2&pageNo=2&ServiceKey=H7yH0uPAmfUdk0x39uPi51l3fPiaCoslBi/az94xW4x42x+a/zdo5YZret/GwBNU0DoraBzYLHMoQXVWho6Rkw==
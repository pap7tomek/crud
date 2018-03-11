var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11226000',
    password : 'sThMjWHuPJ',
    database : 'sql11226000'
});
//!qwe123Pa
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
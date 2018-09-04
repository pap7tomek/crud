var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'sql7.freemysqlhosting.net',
    user     : 'sql7255123',
    password : '3PfmCqDlW6',
    database : 'sql7255123'
});
//!qwe123Pa
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
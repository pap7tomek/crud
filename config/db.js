var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'crud'
});
//!qwe123Pa
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
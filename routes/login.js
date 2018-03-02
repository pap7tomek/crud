var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var db = require('../config/db');

router.post('/', function(req, res, next) {
    var post  = {login:req.body.login, password:CryptoJS.SHA256(req.body.password)};
    db.query('SELECT id tbluser WHERE ?', post, function(err, result) {
      if (err) throw err;
    });
    res.render('register', { title: "Rejestracja" });
  });
module.exports = router;
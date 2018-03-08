var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var db = require('../config/db');

router.get('/', function(req, res, next) {
  res.render('register', { title: "Rejestracja" });
});

router.post('/', function(req, res, next) {
  db.query('SELECT * FROM tbluser WHERE login = ?',[req.body.login],  function(err, result) {
    if (err) throw err;
    if(result.length === 0){
      var post  = {login:req.body.login, password:CryptoJS.SHA256(req.body.password)};
      db.query('INSERT INTO tbluser SET ?', post, function(err, result) {
        if (err) throw err;
      });
      res.render('register', { title: "Rejestracja" }); 
    }else{
      res.send("fail");
    }
    
  });
});
  
module.exports = router;
var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var db = require('../config/db');

router.get('/', function(req, res, next) {
  if(typeof req.session.user == "undefined" || req.session.user == null){
    res.send("Nie masz uprawnien<br><a href='/'>Strona główna</a>");
  }
  else{
    db.query('SELECT login FROM tbluser WHERE idUser = ?', [req.session.user], function(err, result) {
      res.render('panel', { title: "Panel",  user: result[0].login});
    });
  }
  
  
  
});
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});
router.post('/', function(req, res, next) {
    var post  = {login:req.body.login, password:CryptoJS.SHA256(req.body.password)};
    db.query('INSERT INTO tbluser SET ?', post, function(err, result) {
      if (err) throw err;
    });
    res.render('register', { title: "Rejestracja" });
  });
module.exports = router;
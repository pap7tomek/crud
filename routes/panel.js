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
      db.query('SELECT * FROM tblnote WHERE idUser = ? AND visible = 1', [req.session.user], function(err, result2) {
        res.render('panel', { title: "Panel",  user: result[0].login, notes: result2 });
      });
      
    });
  }  
});
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});
router.post('/save', function(req, res, next) { 
    if(typeof req.session.user == 'undefined'){
      res.send("fail");
    }else{
      var post  = {text: req.body.note, idUser: req.session.user, visible: 1};
      db.query('INSERT INTO tblnote SET ?', post, function(err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result.insertId));
      });
    }
});
module.exports = router;
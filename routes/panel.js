var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var db = require('../config/db');
const translate = require('google-translate-api');

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

router.post('/delete', function(req, res, next) { 
  if(typeof req.session.user == 'undefined'){
    res.send("fail");
  }else{
    var post  = {idNote: req.body.idNote};
    db.query('UPDATE tblnote SET visible = 0 WHERE ?', post, function(err, result) {
      if (err) throw err;
      res.send("good");
    });
  }
});

router.post('/edit', function(req, res, next) { 
  if(typeof req.session.user == 'undefined'){
    res.send("fail");
  }else{
    var text = {text: req.body.text};
    var post  = {idNote: req.body.idNote};
    db.query('UPDATE tblnote SET ? WHERE ?', [text, post], function(err, result) {
      if (err) throw err;
      res.send("good");
    });
  }
});
var tab = []
async function toEnglish(result, callback){
  const result2 = await translate(result.text, {to: 'en'})
  result2.idNote = result.idNote;
  tab.push(result2);
  callback();
  return result2.text;
}
router.get('/translate', function(req, res, next) {
  if(typeof req.session.user == "undefined" || req.session.user == null){
    res.send("Nie masz uprawnien<br><a href='/'>Strona główna</a>");
  }
  else{
    db.query('SELECT login FROM tbluser WHERE idUser = ?', [req.session.user], function(err, result) {
      db.query('SELECT * FROM tblnote WHERE idUser = ? AND visible = 1', [req.session.user], function(err, result2) {
        var i = 0;
        result2.forEach((item, index, array) => {
          toEnglish(item, () => {
            i++
            if(i === result2.length) {
              tab.sort(function(a,b){
                var keyA = a.idNote,
                    keyB = b.idNote;
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0; 
              })
              res.render('panel', { title: "Panel",  user: result[0].login, notes: tab });
              tab = [];
            }
          });
        });
      });  
    });
  }  
});

module.exports = router;
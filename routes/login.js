var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var session = require('express-session');
var db = require('../config/db');

router.post('/', function(req, res, next) {
    var login  = {login:req.body.login};
    var password = {password:CryptoJS.SHA256(req.body.password)};
    db.query('SELECT idUser, login FROM tbluser WHERE ? AND ?', [login, password], function(err, result) {
      if (err) throw err;
    if(result.length){
      req.session.user = result[0].idUser;
      res.cookie('id',result[0].idUser).send("good");
    }else{
      res.send("fail");
    }
      

    });
  });
module.exports = router;
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.render('index', { title: "Rejestracja" });
});

module.exports = router;

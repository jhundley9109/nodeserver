var express = require('express');
var router = express.Router();
var dataAccessObj = require('_/dataaccessobj')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
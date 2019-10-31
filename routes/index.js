var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const username = req.session.username;
  res.render('index', { title: 'Express', username: username });
});

module.exports = router;

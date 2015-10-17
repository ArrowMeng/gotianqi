var express = require('express');
var request = require('request');
var router = express.Router();

var config = require('../config');


/*
 * GET notelist.
 */
router.post('/login', function(req, res) {
  var url = config.DB_SERVER + '/auth' + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

/*
 * POST to adduser.
 */
router.post('/signup', function(req, res) {
  var url = config.DB_SERVER + '/auth' + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

module.exports = router;
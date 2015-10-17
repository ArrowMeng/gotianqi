var express = require('express');
var request = require('request');
var router = express.Router();

var config = require('../config');

/*
 * GET message list.
 */
router.post('/messagelist', function(req, res) {
  var url = config.DB_SERVER + '/messages' + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

/*
 * POST to add message.
 */
router.post('/addMessage', function(req, res) {
  var url = config.DB_SERVER + '/messages' + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

module.exports = router;
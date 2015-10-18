var express = require('express');
var request = require('request');
var router = express.Router();

var config = require('../config');

router.post("/register", function(req, res) {
  var url = config.MASTER_SERVER + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

router.post("/unregister", function(req, res) {
  var url = config.MASTER_SERVER + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

/*
 * GET message list.
 */
router.post('/messagelist', function(req, res) {
  var url = config.MASTER_SERVER + '/messages' + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

/*
 * POST to add message.
 */
router.post('/addMessage', function(req, res) {
  var url = config.MASTER_SERVER + '/messages' + req.url;
  request.post({url: url, form: req.body}).pipe(res);
});

module.exports = router;
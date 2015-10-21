var express = require('express');
var request = require('request');
var router = express.Router();

var membershipRoute = require('./membership');
var config = require('../config');

//MEMBERSHIP
router.get("/verify-session", membershipRoute.verifySession);
router.post("/register", membershipRoute.register);
router.post("/unregister", membershipRoute.unregister);

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

module.exports.addMessage = function(message) {
	var url = config.DB_SERVER + '/messages/addMessage';
	request.post({url: url, form: message});
};
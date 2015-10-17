var express = require('express');
var request = require('request');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    res.redirect('/');

});

router.post('/userExists', function(req, res) {
    res.redirect('/');

});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    res.redirect('/');

});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    res.redirect('/');

});

module.exports = router;

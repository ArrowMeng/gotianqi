var express = require('express');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');

var config = require('../config');

var messageSchema = new Schema({
  userId: String,
  toId: String,
  text: String,
  pic: String,
  date: Date,
  read: Boolean,
  readDate: Date
});


/*
 * GET notelist.
 */
router.post('/messageList', function(req, res) {
    var Message = mongoose.model('Message', messageSchema);
    //Message.find({ userId: req.body.userId, toId: req.body.toId })
    Message.find()
           .limit(100)
           .exec(function(err, messages) {
        res.json({messages: messages});
    });
});

/*
 * POST to adduser.
 */
router.post('/addMessage', function(req, res) {
    var Message = mongoose.model('Message', messageSchema);
    var message = new Message({
      userId: req.body.userId,
      toId: req.body.toId,
      text: req.body.text,
      pic: req.body.pic,
      date: new Date()
    });
    message.save(function(err) {
      if (err) {
        res.send({ error: err });
      }
      else {
        res.send({ message: message });
      }
      
    });
});

module.exports = router;

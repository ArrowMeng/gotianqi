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
           .exec(function(err, messages) {
        res.json(messages);
    });
});

/*
 * POST to addMessage.
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

console.log(req.body.userId + ',' + req.body.toId + ',' + req.body.text);
    
    message.save(function(err) {
      if (err) {
    	console.log(err);
        res.send({ error: err });
      }
      else {
        res.send({ message: message });
      }
      
    });
});

/*
 * DELETE to deleteMessage.
 */
router.delete('/deleteMessage/:id', function(req, res) {
    var msgToDelete = req.params.id;
    var Message = mongoose.model('Message', messageSchema);
    Message.remove({'_id': msgToDelete}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;

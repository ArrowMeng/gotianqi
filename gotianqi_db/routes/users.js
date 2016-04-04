var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  userId: String,
  userName: String,
  fullName: String,
  password: String,
  age: String,
  gender: String,
  email: String,
  pic: String,
  readDate: Date
});

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var User = mongoose.model('users', userSchema);
    //User.find({ userId: req.body.userId, toId: req.body.toId })
    User.find()
           //.limit(100)
           .exec(function(err, users) {
        res.json(users);
    });
});

router.post('/userExists', function(req, res) {
    var User = mongoose.model('users', userSchema);
    User.find({ userId: req.body.userId, toId: req.body.toId })
             .exec(function(err, docs) {
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var User = mongoose.model('users', userSchema);
    var user = new User({
      userName: req.body.userName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender
    });

    console.log('add user2');

    user.save(function(err) {
      if (err) {
        console.log(err);
        res.send({ error: err });
      }
      else {
        res.send({ msg: '' });
      }

    }); 

});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var userToDelete = req.params.id;
    var User = mongoose.model('users', userSchema);
    User.remove({'_id': userToDelete}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');

var config = require('../config');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  picture: String,
  facebook: String,
  foursquare: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  live: String,
  yahoo: String,
  twitter: String,
  twitch: String
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 * GET notelist.
 */
router.post('/login', function(req, res) {
  var User = mongoose.model('User', userSchema);
  User.findOne({ email: req.body.email }, {}, function(err, user) {
    if (!user) {
      var user = new User({
        email: req.body.email,
        password: req.body.password
      });
      user.save(function() {
        res.send({ user: user, token: createJWT(user) });
      });
    }
    else {
        //res.send({ user: user, token: createJWT(user) });
    }
    
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }
      res.send({ user: user, token: createJWT(user) });
    });
  });
});

/*
 * POST to adduser.
 */
router.post('/signup', function(req, res) {
  var User = mongoose.model('User', userSchema);
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already exist' });
    }
    var user = new User({
      email: req.body.email,
      password: req.body.password
    });
    user.save(function() {
      res.send({ user: user, token: createJWT(user) });
    });
  });
});

module.exports = router;
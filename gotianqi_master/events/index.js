'use strict';

var socketService = require('../shared/socket-service');
var sessionService = require('../shared/session-service');
var membershipRoute = require('../routes/membership');

var redis = require('redis');
var sub = redis.createClient();
var pub = redis.createClient();
sub.subscribe('chat');

module.exports = function(io) {
    io.on('connection', function(socket) {
        /*
         When the user sends a chat message, publish it to everyone (including myself) using
         Redis' 'pub' client we created earlier.
         Notice that we are getting user's name from session.
         */
        socket.on('chat', function(data) {
            var msg = JSON.parse(data);
            var reply = JSON.stringify({
                action: 'message',
                user: msg.user,
                msg: msg.msg
            });
            console.dir(reply);
            pub.publish('chat', reply);
        });


        /*
         Use Redis' 'sub' (subscriber) client to listen to any message from Redis to server.
         When a message arrives, send it back to browser using socket.io
         */
        sub.on('message', function(channel, message) {
            socket.emit(channel, message);
        });


        socket.on('user:connected', function (userName, callback) {
            socketService.set(userName, socket);

            var user = membershipRoute.getUser(userName);

            var reply = JSON.stringify({
                action: 'control',
                user: user,
                msg: ' joined the channel'
            });

            pub.publish('chat', reply);

            // var users = membershipRoute.getAllUsers();
            // callback(null, users);
        });

        socket.on("user:rename", function (userName, callback) {
           sessionService.getUserName(socket.request, function (err, oldUserName) {
                sessionService.setSessionProperty(socket.request.session, "userName", userName, function (err, data) {
                   if (err) {
                        callback(err);
                        return;
                    }

                    sessionService.getUserName(socket.request, function (err, newUserName) {
                       if (err) {
                            callback(err);
                            return;
                        }

                        membershipRoute.renameUser(oldUserName, newUserName);
                        var user = membershipRoute.getUser(newUserName);
                        var data = { oldUserName: oldUserName, user: user };

                        socket.broadcast.emit("user:renamed", data);
                        callback(null, data);
                    });
                });
            });
        });

        socket.on("disconnect", function () {
            sessionService.getUserName(socket.request, function (err, currentUserName) {
                if (!err) {
                    socket.broadcast.emit("user:left", currentUserName);
                    membershipRoute.unregister(currentUserName);
                    socketService.remove(currentUserName);
                }
                else
                    console.log(err);
            });
         });

    })
}

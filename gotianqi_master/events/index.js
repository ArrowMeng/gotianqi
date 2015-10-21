'use strict';

var socketService = require('../shared/socket-service');
var sessionService = require('../shared/session-service');
var membershipRoute = require('../routes/membership');
var messagesRouter = require('../routes/messages');

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
            
            messagesRouter.addMessage(msg);
            
            pub.publish('chat', reply);
        });


        /*
         Use Redis' 'sub' (subscriber) client to listen to any message from Redis to server.
         When a message arrives, send it back to browser using socket.io
         */
        sub.on('message', function(channel, message) {
            socket.emit(channel, message);
        });


        socket.on('user:connected', function (user, callback) {
            socketService.set(user._id, socket);

           // var user = membershipRoute.getUser(user._id);

            var reply = JSON.stringify({
                action: 'control',
                user: user,
                msg: ' joined the channel'
            });

            pub.publish('chat', reply);

            // var users = membershipRoute.getAllUsers();
            // callback(null, users);
        });

        socket.on("user:rename", function (userId, callback) {
           sessionService.getUserId(socket.request, function (err, oldUserId) {
                sessionService.setSessionProperty(socket.request.session, "userId", userId, function (err, data) {
                   if (err) {
                        callback(err);
                        return;
                    }

                    sessionService.getUserId(socket.request, function (err, newUserId) {
                       if (err) {
                            callback(err);
                            return;
                        }

                        membershipRoute.renameUser(oldUserId, newUserId);
                        var user = membershipRoute.getUser(newUserId);
                        var data = { oldUserId: oldUserId, user: user };

                        socket.broadcast.emit("user:renamed", data);
                        callback(null, data);
                    });
                });
            });
        });

        socket.on("disconnect", function () {
            sessionService.getUserId(socket.request, function (err, currentUserId) {
                if (!err) {
                    socket.broadcast.emit("user:left", currentUserId);
                    membershipRoute.unregister(currentUserId);
                    socketService.remove(currentUserId);
                }
                else
                    console.log(err);
            });
         });

    })
}

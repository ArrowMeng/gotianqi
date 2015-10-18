var socketService = require('../shared/socket-service');
var sessionService = require('../shared/session-service');
var membershipRoute = require('../routes/membership');

module.exports = function (socket) {
    socket.on("user:connected", function (userId, callback) {
        socketService.set(userId, socket);

        var user = membershipRoute.getUser(userId);
        socket.broadcast.emit("user:joined", user);

        var users = membershipRoute.getAllUsers();
        callback(null, users);
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
};
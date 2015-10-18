var socketService = require('../shared/socket-service');

var users = {};

var self = module.exports = {
    verifySession: function (req, res) {
        var userId = req.session.userId;

        if (userId && !users[userId]) {
            users[userId] = { userId: userId };
            res.send({ sessionVerified: true, user: users[userId] });
        }
        else {
            if (users[userId])
                req.session.userId = "";
            res.send({ sessionVerified: false });
        }
    },
    register: function (req, res) {
        var userId = req.body.userId;

        if (users[userId]) {
            res.send({ membershipResolved: false, error: "User already exists" });
            return;
        }

        users[userId] = { userId: userId };
        req.session.userId = userId;
        res.send({ membershipResolved: true, user: users[userId] });
    },
    unregister: function (userId) {
        delete users[userId];
    },
    getUser: function (userId) {
        return users[userId];
    },
    getAllUsers: function () {
        return users;
    },
    renameUser: function (oldUserId, newUserId) {
        var user = self.getUser(oldUserId);
        user.userId = newUserId;
        users[newUserId] = user;
        self.unregister(oldUserId);
    }
};
var sockets = {};

module.exports = {
    get: function (userId) {
        return sockets[userId];
    },
    set: function (userId, socket) {
        sockets[userId] = socket;
    },
    remove: function (userId) {
        delete sockets[userId];
    }
};
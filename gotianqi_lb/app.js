var config = require('./config');
var seaport = require('seaport');
var ports = seaport.connect('localhost', config.seaport);
var http = require('http');

var server = http.createServer(function (req, res) {
    res.end('version 0.0.0\r\n');
});

server.listen(ports.register('gotianqi@0.0.0'));


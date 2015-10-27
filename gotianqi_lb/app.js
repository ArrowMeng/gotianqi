var config = require('./config');
var seaport = require('seaport');
var ports = seaport.connect('localhost', config.seaport);
var http = require('http');

var server = http.createServer(function (req, res) {
	var url = config.DB_SERVER + req.url;
	console(url);
	request.post({url: url, form: req.body}).pipe(res);
});

server.listen(ports.register('gotianqi@0.0.0'));


var config = require('./config');
var seaport = require('seaport');
var ports = seaport.connect('localhost', config.seaport);
var http = require('http');

var server = http.createServer(function (req, res) {
	var url = config.DB_SERVER + req.url;
	console(url);
	
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
	
	request.post({url: url, form: req.body}).pipe(res);
});

server.listen(ports.register('gotianqi@0.0.0'));


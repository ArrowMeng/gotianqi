var config = require('./config');
var seaport = require('seaport');
var server = seaport.createServer();
server.listen(config.seaport);

var bouncy = require('bouncy');
bouncy(function (req, bounce) {
    var domains = (req.headers.host || '').split('.');
    var service = 'gotianqi@' + ({
        unstable : '0.1.x',
        stable : '0.0.x'
    }[domains[0]] || '0.0.x');

    var ps = server.query(service);
    
    if (ps.length === 0) {
        console.log('service not available\n');
    }
    else {
        console.log(ps.length);
        bounce(ps[Math.floor(Math.random() * ps.length)]);
    }
}).listen(8000);

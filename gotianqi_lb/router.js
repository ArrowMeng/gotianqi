var config = require('./config');
var seaport = require('seaport');
var server = seaport.createServer();
server.listen(config.seaport);

var bouncy = require('bouncy');
bouncy(function (req, res, bounce) {
    var domains = (req.headers.host || '').split('.');
    var service = 'gotianqi@' + ({
        unstable : '0.1.x',
        stable : '0.0.x'
    }[domains[0]] || '0.0.x');
   
    res.header("Access-Control-Allow-Origin", config.allowedCORSOrigins);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    
    var ps = server.query(service);
    
    if (ps.length === 0) {
        res.end("service not available\n");
    }
    else {
        console.log(ps.length);
        bounce(ps[Math.floor(Math.random() * ps.length)]);
    }
}).listen(config.loadbalancePort);

const http = require('http');

var routes = {
    "/" : function index (req, res) {
        res.writeHead(200);
        res.end("Hello Node.js with Object Routing")
    },
    "/foo" : function foo(req, res) {
        res.writeHead(200);
        res.end("You are now viewing 'foo' page!");
    }
}

http.createServer( function(req, res){
    if(req.url in routes){
        return routes[req.url](req, res);
    }
    // Else situation
    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
}).listen(process.env.PORT || 1337);
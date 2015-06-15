var http = require('http');
var server = http.createServer(function(request,response) {
 console.log('request starting');
 response.write('hello client\n');
 response.end();
});

server.listen(3000);
console.log('server running at at http://127.0.0.1:3000');

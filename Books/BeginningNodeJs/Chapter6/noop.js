var connect = require('connect');

// Create a connect dispatcher and register with http
var app = connect()
            .use(function (req, res, next) { next();})
            .listen(3000);
console.log('server listening on port 3000');


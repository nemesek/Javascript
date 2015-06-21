var util = require('util');

// a simple logging middleware
function logit (req, res, next) {
    util.log(util.format('Request received: %s, %s', req.method, req.url));
    next();
}

var connect = require('connect');

connect()
    .use(logit)
    .listen(3000);

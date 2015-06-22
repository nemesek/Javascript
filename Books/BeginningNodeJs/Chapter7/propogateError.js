var express = require('express');
var timeout = require('connect-timeout');

var app = express()
    .use(timeout(5000))
    .use(function (req, res, next) {
        // simulate long running call
        setTimeout(function () {
            next();
        }, 6000);
    })
    .use(haltOnTimeout)
    .use(function (req, res, next) {
        console.log('should not be here');
        res.end('Done');    // ERROR request already terminated
    })
    .listen(3000);

function haltOnTimeout (req, res, next) {
    console.log('in halt on timeout');
    if (!req.timedout) next();
    else {console.log('timed out');}
}

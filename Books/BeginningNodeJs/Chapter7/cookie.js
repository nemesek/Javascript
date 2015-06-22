var express = require('express');
var app = express()
    .use(function (req, res) {
        res.cookie('name', 'foo');
        res.end('Hey Cookie');
    })
    .listen(3000);


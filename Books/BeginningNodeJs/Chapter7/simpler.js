var express = require('express');

express()
    .use(function (req, res, next) {
        res.end("Dan's simpler express app!");
    })
    .listen(3000);

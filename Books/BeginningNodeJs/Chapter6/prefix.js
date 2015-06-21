function echo (req, res, next) {
    req.pipe(res);
}

var connect = require('connect');

// mounting
connect()
    .use('/echo', echo)
    .use(function (req, res) { 
        console.log(req.url);
        res.end('Wassup\n'); })
    .listen(3000);

function greeter (message) {
    return function (req, res, next) {
        res.end(message);
    };
}

var helloWorldGreeter = greeter('Hello World');
var heyThereGreeter = greeter('Hey There');

var connect = require('connect');

connect()
    .use('/hello', helloWorldGreeter)
    .use('/hey', heyThereGreeter)
    .use(function (req, res) { res.end('Nope'); })
    .listen(3000);

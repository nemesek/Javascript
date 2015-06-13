define([], function() {
    var foo = function() {
        console.log('function foo was called.');
    };
    return foo; // function foo was exported
});

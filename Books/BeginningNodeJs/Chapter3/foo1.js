var a = function(){
    console.log('a was called');
};

var b = function(){
    console.log('b was called');
};

module.exports = {
    a: a,
    b: b
};

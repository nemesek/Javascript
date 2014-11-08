module.exports = function(grunt){
  // Your taks go here
  grunt.registerTask('default', function(){
    grunt.log.writeln('Hello from Grunt');
  });


  // call via $ grunt greet:Dan
  grunt.registerTask('greet', function(name){
    grunt.log.writeln('Hi there, ' + name);
  });

  // call via $ grunt addNumbers:1:2
  grunt.registerTask('addNumbers', function(first, second){
    if(isNaN(first)){
      grunt.warn('The first argument must be a number.');
    }
    var answer = Number(first) + Number(second);
    grunt.log.writeln(first + ' + ' + second + ' is ' + answer);
  });

  // chaining tasks
  grunt.registerTask('all', ['default', 'greet:Brian', 'addNumbers:2:3']);

  grunt.registerTask('praise', 'Have grunt say nice things about you', function(){
    var praise = [
      "You're awesome",
      "You're the best developer ever",
      "You are extremely attractive",
      "Everyone loves you"
    ];

    var pick = praise[(Math.floor(Math.random() * praise.length))]
  });

  grunt.registerTask('product', 'Returns the product of two numbers', function(first, second){
    var answer = Number(first) * Number(second);
    grunt.log.writeln('The product is : ' + answer);
  });
};

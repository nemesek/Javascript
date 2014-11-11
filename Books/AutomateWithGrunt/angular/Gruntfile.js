module.exports = function(grunt){

  grunt.config.init({
    build: {
      angular: {
        src: ['bower_components/angular/angular.js',
              'bower_components/angular-resource/angular-resource.js'],
        dest: 'dist/angular.js'
      },
      angularWithjQuery: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/angular/angular.js',
              'bower_components/angular-resource/angular-resource.js'],
        dest: 'dist/jquery-angular.js'
      }
    }
  });

  grunt.registerMultiTask('build', 'Concatenate files.', function() {
    var output = '';
    this.files.forEach(function(filegroup) {
      sources = filegroup.src.map(function(file){
        return(grunt.file.read(file));
      });
      output = sources.join(';');
      grunt.file.write(filegroup.dest, output);
    });
  });
}

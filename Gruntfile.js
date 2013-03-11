module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/min/*.js',
        dest: 'src/resources/<%= pkg.name %>.min.js'
      }
    },
    minified : {
      files: {
        src: [
        'src/resources/js/**/*.js'
        ],
        dest: 'build/min/'
      },
      options : {
        sourcemap: true,
        allinone: false
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.loadNpmTasks('grunt-minified');

  // Default task(s).
  grunt.registerTask('default', ['minified','uglify']);


};
module.exports = function(grunt) {

    grunt.initConfig({
      sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded',
            sourcemap: 'none'
          },
          files: {                         // Dictionary of files
            'static/css/main.css': 'static/scss/main.scss'
          }
        }
      },
      watch: {
        files: ['static/scss/*'],
        tasks: ['sass'],
     }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};

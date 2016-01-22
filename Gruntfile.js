//Grunt Project workflow

//run "grunt watch"
//will watch for added js files and sass updates and add the js files to the index.html and compile sass to main.css
//if you get a sass error, you need to run "sudo grunt watch" - this is because of permissions preventing sass from creating a cache file

//run "grunt prod"
//creates production assets - concatenates and uglifies js, compresses css

//run "grunt dev"
//re-creates assets and injects them as separate files into the index.html, decompresses css

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    tags: {
      dev: {
        src: [
          'node_modules/angular/angular.js',
          'node_modules/jquery/dist/jquery.js',
          'node_modules/angular-ui-router/build/angular-ui-router.min.js',
          'js/vendor/**/*.js',
          'js/app.js',
          'js/routes.js',
          'js/constants/**/*.js',
          'js/directives/**/*.js',
          'js/models/**/*.js',
          'js/services/**/*.js',
          'js/providers/**/*.js'
        ],
        dest: 'index.html'
      },
      prod: {
        src: [
          'js/main.min.js'
        ],
        dest: 'index.html'
      }
    },
    sass: {                              // Task
      dev: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'styles/main.css': 'styles/main.scss'        // 'destination': 'source'
        }
      },
      prod: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'styles/main.css': 'styles/main.scss'        // 'destination': 'source'
        }
      }
    },
    concat: {
      "options": {
        separator: "\n", //add a new line after each file
        banner: "", //added before everything
        footer: "" //added after everything
      },
      "build": {
        "src": [
          'node_modules/angular/angular.js',
          'node_modules/jquery/dist/jquery.js',
          'js/vendor/**/*.js',
          'js/app.js',
          'js/routes.js',
          'js/constants/**/*.js',
          'js/directives/**/*.js',
          'js/models/**/*.js',
          'js/services/**/*.js',
          'js/vendor/**/*.js'
        ],
        "dest": "js/main.js"
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },
    watch: {
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: [
          'js/**/*.js',
          'js/vendor/**/*.js',
          'js/app.js',
          'js/routes.js',
          'js/constants/**/*.js',
          'js/directives/**/*.js',
          'js/models/**/*.js',
          'js/services/**/*.js',
          'js/vendor/**/*.js'
        ],
        tasks:['tags:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load required module
  grunt.loadNpmTasks('grunt-script-link-tags');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definitions
  grunt.registerTask('default', []);
  grunt.registerTask('prod', ['sass:prod', 'concat', 'uglify', 'tags:prod']);
  grunt.registerTask('dev', ['sass:dev', 'tags:dev']);


};


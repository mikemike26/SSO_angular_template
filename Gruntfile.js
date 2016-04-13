//Grunt Project workflow

//run "grunt watch"
//will watch for added js files and sass updates and add the js files to the index.html and compile sass to main.css
//if you get a sass error, you need to run "sudo grunt watch" - this is because of permissions preventing sass from creating a cache file

//run "grunt prod"
//creates production assets - concatenates and uglifies js, compresses css

//run "grunt dev"
//re-creates assets and injects them as separate files into the index.html, decompresses css

//grunt clean - deletes file/directory
//grunt copy - copies files

//grunt running grunt will create a _www directory, this will be your main build for deployment
//grunt dev or grunt prod must be ran before enabling grunt watch


module.exports = function (grunt) {
  var jsLoadOrder = [
    'js/vendor/angular.js',
    'js/vendor/jquery.js',
    'js/vendor/*.js',
    'js/app.js',
    'js/routes.js',
    'js/**/constants/**/*.js',
    'js/**/classes/**/*.js',
    'js/**/dummyData/**/*.js',
    'js/**/directives/**/*.js',
    'js/**/models/**/*.js',
    'js/**/services/**/*.js',
    'js/**/providers/**/*.js'
  ];

  var copy = {};

  copy.nodeModules = [
    {
      expand: true,
      cwd: 'node_modules/jquery/dist/',
      src: ['jquery.js'],
      dest: 'js/vendor/'
    },
    {
      expand: true,
      cwd: 'node_modules/angular/',
      src: ['angular.js'],
      dest: 'js/vendor/'
    },
    {
      expand: true,
      cwd: 'node_modules/angular-ui-router/release/',
      src: ['angular-ui-router.js'],
      dest: 'js/vendor/'
    },
    {
      expand: true,
      cwd: 'node_modules/fastclick/lib/',
      src: ['fastclick.js'],
      dest: 'js/vendor/'
    },
    {
      expand: true,
      cwd: 'node_modules/lodash/',
      src: ['lodash.js'],
      dest: '_www/js/vendor/'
    }
  ];

  copy.js = {
    expand: true,
    cwd: 'js/',
    src: ['**'],
    dest: '_www/js/'
  };
  copy.templates = {
    expand: true,
    cwd: 'templates/',
    src: ['**'],
    dest: '_www/templates/'
  };
  copy.styles = {
    expand: true,
    cwd: 'styles/',
    src: [
      'main.css',
      'main.css.map'
    ],
    dest: '_www/styles/'
  };
  copy.fonts = {
    expand: true,
    cwd: 'fonts/',
    src: ['**'],
    dest: '_www/fonts/'
  };
  copy.images = {
    expand: true,
    cwd: 'images/',
    src: ['**'],
    dest: '_www/images/'
  };
  copy.index = {
    expand: true,
    cwd: '',
    src: ['index.html'],
    dest: '_www/'
  };


  // Project configuration.
  grunt.initConfig({
    clean: {
      js: ['_www/js', '_www/index.html'],
      styles: ['_www/styles'],
      www: ['_www']
    },
    copy: {
      dev: {
        files: [
          copy.fonts,
          copy.images,
          copy.js,
          copy.styles,
          copy.templates,
          copy.index
        ]
      },
      prod: {
        files: [
          copy.fonts,
          copy.images,
          copy.styles,
          copy.templates,
          copy.index,
          {
            expand: true,
            cwd: 'js/',
            src: ['main.min.js'],
            dest: '_www/js'
          }
        ]
      },
      js: {
        files: [
          copy.js,
          copy.index
        ]
      },
      styles: {
        files: [
          copy.styles
        ]
      },
      vendor: {
        files: copy.nodeModules
      }
    },

    tags: {
      dev: {
        src: jsLoadOrder,
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
        "src": jsLoadOrder,
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
        tasks: ['sass:dev', 'clean:styles', 'copy:styles']
      },
      js: {
        files: jsLoadOrder,
        tasks: ['copy:vendor', 'tags:dev', 'clean:js', 'copy:js'],
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Task definitions
  grunt.registerTask('default', []);
  grunt.registerTask('prod', ['sass:prod', 'copy:vendor', 'concat', 'uglify', 'tags:prod', 'clean:www', 'copy:prod']);
  grunt.registerTask('dev', ['sass:dev', 'copy:vendor', 'tags:dev', 'clean:www', 'copy:dev']);


};


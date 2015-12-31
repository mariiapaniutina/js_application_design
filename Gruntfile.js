module.exports = function(grunt) {

    var config = {
      pkg: grunt.file.readJSON('package.json'),
      banner_title: '/* App Name: <%= pkg.name %> */\n' + 
        '/* Created:  <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n' + 
        '/* Author: <%= pkg.author %> */\n'
    };
  
    //minifying
    grunt.loadNpmTasks('grunt-contrib-uglify');
    config.uglify = {
        options: {
            banner: '<%= banner_title %>',
            sourceMap: true
        },
        build: {
          src: 'src/js/*.js',
          dest: 'build/js/<%= pkg.name %>.min.js'
        }
    };
    
    //js validation
    grunt.loadNpmTasks('grunt-contrib-jshint');
    config.jshint = {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          //jQuery: true
        }
      }
    };
    
    //from less to css
    grunt.loadNpmTasks('grunt-contrib-less');
    config.less = {
        compile: {
            files: {
                'build/style/compiled.css': [
                  'src/style/main.less'
                ] 
            }
        } 
    };
    
    //making sprites => doesnt work properly with large images
    grunt.loadNpmTasks('grunt-spritesmith');
    config.sprite = {
        all: {
            src: 'src/images/*.png',
            dest: 'build/images/main.png',
            destCss: 'src/style/main.less'
        }
    };
    
    //image minifying
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    config.imagemin = {
        all: {
          options: {
            optimizationLevel: 3
          },
          files: [{
            expand: true,                  
            cwd: 'src/images/',
            src: ['*.{png,jpg,gif}'],
            dest: 'build/images/original/'
          }]
        }
    };
    
    //js concatenation
    grunt.loadNpmTasks('grunt-contrib-concat');
    config.concat = {
        js: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n\n'
            },
            files: {
                'js_application_design.js': [
                  'src/js/*.js'
                ] 
            }
        } 
    };
    
    //watcher
    grunt.loadNpmTasks('grunt-contrib-watch');
    config.watch = {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    };

    // Tasks
    grunt.registerTask('default', ['jshint', 'sprite', 'imagemin', 'less', 'concat', 'uglify']);
    grunt.registerTask('debug', ['default', 'watch']);
    grunt.registerTask('release', []);

    grunt.initConfig(config);

};
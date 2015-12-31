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
            destCss: 'src/style/icons.less'
        }
    };
    
    //lets replace path is icons.less => to make it public
    grunt.loadNpmTasks('grunt-text-replace');
    config.replace = {
        icons_less: {
          src: ['src/style/icons.less'],
          overwrite: true, 
          replacements: [{
            from: "../../build/images/",
            to: "../images/"
          }]
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
    
    /* Versioning (x.x.x-y)
        grunt bump-only         >>      Version bumped to 0.0.1 (in package.json) 
        grunt bump-only:minor   >>      Version bumped to 0.1.0 (in package.json)
        grunt bump-only:major   >>      Version bumped to 1.0.0 (in package.json)
    */
    grunt.loadNpmTasks('grunt-bump');
    config.bump = {
        options: {
            files: ['package.json'],
            //updateConfigs: [],
            commit: true,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['package.json'],
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: true,
            pushTo: 'origin'
        }
    };
    
    //changelog
    grunt.loadNpmTasks('grunt-conventional-changelog');
    config.conventionalChangelog = {
        options: {
          changelogOpts: {
            // conventional-changelog options go here
            preset: 'angular'
          },
          context: {
            // context goes here
          },
          gitRawCommitsOpts: {
            // git-raw-commits options go here
          },
          parserOpts: {
            // conventional-commits-parser options go here
          },
          writerOpts: {
            // conventional-changelog-writer options go here
          }
        },
        release: {
          src: 'CHANGELOG.md'
        }
    };
    
    //watcher
    grunt.loadNpmTasks('grunt-contrib-watch');
    config.watch = {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    };

    // Tasks
    grunt.registerTask('default', ['jshint', 'sprite','replace:icons_less', 'imagemin', 'less', 'concat', 'uglify']);
    
    grunt.registerTask('debug', ['default', 'watch']);
    grunt.registerTask('notes', ['bump-only', 'conventionalChangelog', 'bump-commit']);
    
    grunt.registerTask('develop', ['default', 'bump:patch']);
    grunt.registerTask('release', ['default', 'bump:minor']);

    grunt.initConfig(config);

};
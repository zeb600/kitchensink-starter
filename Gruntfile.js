module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/*.js',
                    'js/main.js'
                ],
                dest: 'js/build/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
               files: [{
                    expand: true,
                    cwd: 'assets/img/src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img/build/'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                }, {
                    removeUselessStrokeAndFill: false
                }, {
                    convertPathData: {
                        straightCurves: false // advanced SVGO plugin option
                    }
                }]
           },
            dist: {                     // Target
                files: [{               // Dictionary of files
                    expand: true,       // Enable dynamic expansion.
                    cwd: 'assets/img/src',     // Src matches are relative to this path.
                    src: ['**/*.svg'],  // Actual pattern(s) to match.
                    dest: 'assets/img/build/',       // Destination path prefix.
                    ext: '.min.svg'     // Dest filepaths will have this extension.
                }]
            }
       },

       sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/style.min.css': 'css/style.scss'
                }
            }
        },

        watch: {
            options:{
                livereload: true,
            },
            scripts: {
                files: ['js/libs/*.js', 'js/*.js'],
                tasks: ['concat', 'uglify', 'copy'],
                options: {
                    spawn: false,
                },
            },
            sasscompile: {
                files: [    'css/*.scss',
                            'css/vendor/*.scss',
                            'css/ui/*.scss',
                            'css/base/*.scss'
                            ],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            imageOptim:{
                files: ['assets/img/src/*.{png,jpg,gif}'],
               tasks: ['imagemin'],
               options: {
                   spawn: false,
               }
           },
           svgOptim:{
               files: ['assets/img/src/*.svg'],
               tasks: ['svgmin'],
               options: {
                   spawn: false,
               }
           },
       }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'svgmin', 'sass']);
    //grunt.registerTask('default', ['concat', 'uglify', 'sass']);
    grunt.registerTask('live', ['watch']);
};

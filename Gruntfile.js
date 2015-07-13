'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-env');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app : 'src',
            dist: 'dist'
        },

        env : {
            dev : {
                HTTP_PROXY : 'http://proxy-chain.intel.com:911/',
                HTTPS_PROXY: 'http://proxy-chain.intel.com:911/'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/**/*.js'],
                tasks: ['newer:jshint', 'newer:jscs']
            },
            jsTest: {
                files: ['tests/**/*.js'],
                tasks: ['newer:jshint', 'newer:jscs', 'karma']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= yeoman.app %>/**/*.js'
            ],
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },

        jscs: {
            src : ['<%= yeoman.app %>/**/*.js'],
            options: {
                config: '.jscs.json'
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            test: {
                src: 'karma.conf.js',
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                },
                devDependencies: true
            },
            demo: {
                src: 'demo/index.html',
                ignorePath: 'demo/',
                fileTypes: {
                    html: {
                        replace: {
                            js: '<script src="{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="{{filePath}}" />'
                        }
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= yeoman.app %>/**/*.module.js', '<%= yeoman.app %>/**/*.js'],
                dest: 'dist/swissSettings.js'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '**/*.js',
                    dest : '<%= yeoman.dist %>'
                }]
            }
        },

        uglify: {
            main: {
                files: [{
                    src:'<%= yeoman.dist %>/swissSettings.js',
                    dest:'<%= yeoman.dist %>/swissSettings.min.js'
                }]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        coveralls: {
            options: {
                force: false
            },
            test: {
                src: 'coverage/*/lcov.info'
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', [
        'concat',
        'ngAnnotate',
        'uglify'
    ]);

    grunt.registerTask('publishTestResults', [
        'env:dev',
        'coveralls'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:jscs',
        'test',
        'build'
    ]);

    grunt.registerTask('publish', [
        'default',
        'bump'
    ]);
};

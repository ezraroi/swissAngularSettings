module.exports = function(config) {
    config.set({
        files : [
            // bower:
            'bower_components/angular/angular.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // endbower
            'src/*.js',
            'src/**/*.js',
            'tests/**/*.spec.js'
        ],

        port : 9877,
        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher'
        ],

        preprocessors : {
            'src/**/*.js' : ['coverage']
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },

        reporters : ['progress', 'coverage']
    });
};

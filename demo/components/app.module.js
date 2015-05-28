(function () {
    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.mainScreen'
        ])
        .config(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.registerBooleanField('testFiled', true);
            swissSettingsServiceProvider.registerBooleanField('testFiled2', false);
            swissSettingsServiceProvider.registerBooleanField('testFiled3');
        });
})();

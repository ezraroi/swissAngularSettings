(function() {
    'use strict';

    angular.module('app.core')
        .config(configure);

    function configure(swissSettingsServiceProvider) {
        swissSettingsServiceProvider.registerBooleanField('testFiled', true);
        swissSettingsServiceProvider.registerBooleanField('testFiled2', false);
        swissSettingsServiceProvider.registerBooleanField('testFiled3');
    }
})();

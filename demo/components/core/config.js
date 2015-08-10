(function() {
    'use strict';

    angular.module('app.core')
        .config(configure);

    function configure(swissSettingsServiceProvider) {
        swissSettingsServiceProvider.registerBooleanField('testFiled', true);
        swissSettingsServiceProvider.registerBooleanField('testFiled2', false);
        swissSettingsServiceProvider.registerBooleanField('testFiled3');
        swissSettingsServiceProvider.registerBooleanField('timeBasedField', false, moment.duration(5, 'seconds'));
        swissSettingsServiceProvider.registerBooleanField('timeBasedField2', undefined, moment.duration(5, 'seconds'));
    }
})();

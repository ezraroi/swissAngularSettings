(function () {
    'use strict';

    angular
        .module('app.mainScreen')
        .controller('Main', Main);

    function Main($log, swissSettingsService, $interval) {
        /* jshint validthis: true */
        var vm = this;

        vm.swissSettingsService = swissSettingsService;
        $log.debug('Field: ' + swissSettingsService.getTestFiled());
        $log.debug('Field2: ' + swissSettingsService.getTestFiled2());
        $log.debug('Field3: ' + swissSettingsService.getTestFiled3());
        swissSettingsService.setTestFiled3(true);
        $log.debug('Field3: ' + swissSettingsService.getTestFiled3());
        $log.debug('TimeBasedField: ' + swissSettingsService.getTimeBasedField());
        $log.debug('timeBasedField2: ' + swissSettingsService.getTimeBasedField2());
        swissSettingsService.setTimeBasedField(true);
        swissSettingsService.setTimeBasedField2(true);
        $log.debug('TimeBasedField: ' + swissSettingsService.getTimeBasedField());
        $log.debug('TimeBasedField2: ' + swissSettingsService.getTimeBasedField2());

        $interval(function() {
            $log.debug('TimeBasedField: ' + swissSettingsService.getTimeBasedField());
            $log.debug('TimeBasedField2: ' + swissSettingsService.getTimeBasedField2());
        }, 2000);

        ////////////////

    }
})();

(function () {
    'use strict';

    angular
        .module('app.mainScreen')
        .controller('Main', Main);

    function Main($log, swissSettingsService) {
        /* jshint validthis: true */
        var vm = this;

        vm.swissSettingsService = swissSettingsService;
        $log.debug('Field: ' + swissSettingsService.getTestFiled());
        $log.debug('Field2: ' + swissSettingsService.getTestFiled2());
        $log.debug('Field3: ' + swissSettingsService.getTestFiled3());
        swissSettingsService.setTestFiled3(true);
        $log.debug('Field3: ' + swissSettingsService.getTestFiled3());

        ////////////////

    }
})();

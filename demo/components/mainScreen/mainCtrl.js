(function () {
    'use strict';

    angular
        .module('app.mainScreen')
        .controller('Main', Main);

    function Main(swissSettingsService) {
        /* jshint validthis: true */
        var vm = this;

        vm.swissSettingsService = swissSettingsService;

        ////////////////

    }
})();

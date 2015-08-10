(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('ArrayField', ArrayFieldFactory);

    function ArrayFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function ArrayField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'ARRAY', defaultValue, storageDuration);
        }

        ArrayField.prototype = Object.create(AbstractField.prototype);
        ArrayField.prototype.validate = validate;
        ArrayField.prototype.format = format;

        return ArrayField;

        ////////////////

        function validate(value) {
            return angular.isArray(value);
        }

        function format(value) {
            return value;
        }
    }
})();

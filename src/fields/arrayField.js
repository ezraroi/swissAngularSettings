(function () {
    'use strict';

    angular
        .module('swissSettings')
        .factory('ArrayField', ArrayFieldFactory);

    function ArrayFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function ArrayField(name, defaultValue) {
            AbstractField.call(this, name, 'ARRAY', defaultValue);
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

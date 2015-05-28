(function () {
    'use strict';

    angular
        .module('swissSettings')
        .factory('BooleanField', BooleanFieldFactory);

    function BooleanFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function BooleanField(name, defaultValue) {
            AbstractField.call(this, name, 'BOOLEAN', defaultValue);
        }

        BooleanField.prototype = Object.create(AbstractField.prototype);
        BooleanField.prototype.validate = validate;
        BooleanField.prototype.format = format;

        return BooleanField;

        ////////////////

        function validate(value) {
            if ((typeof value !== 'string') && (typeof value !== 'boolean')) {
                return false;
            }
            if (typeof value === 'string') {
                return value === 'true' || value === 'false';
            }
            return true;
        }

        function format(value) {
            return (typeof value === 'string' ? value === 'true' : value);
        }
    }
})();

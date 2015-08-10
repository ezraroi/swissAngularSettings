(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('BooleanField', BooleanFieldFactory);

    function BooleanFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function BooleanField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'BOOLEAN', defaultValue, storageDuration);
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

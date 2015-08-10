(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('NumberField', NumberFieldFactory);

    function NumberFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function NumberField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'NUMBER', defaultValue, storageDuration);
        }

        NumberField.prototype = Object.create(AbstractField.prototype);
        NumberField.prototype.validate = validate;
        NumberField.prototype.format = format;

        return NumberField;

        ////////////////

        function validate(value) {
            return typeof value === 'number';
        }

        function format(value) {
            return value;
        }
    }
})();

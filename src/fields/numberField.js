(function () {
    'use strict';

    angular
        .module('swissSettings')
        .factory('NumberField', NumberFieldFactory);

    function NumberFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function NumberField(name, defaultValue) {
            AbstractField.call(this, name, 'NUMBER', defaultValue);
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

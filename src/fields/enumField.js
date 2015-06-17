(function () {
    'use strict';

    angular
        .module('swissSettings')
        .factory('EnumField', EnumFieldFactory);

    function EnumFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function EnumField(name, allowedValues, defaultValue) {
            if (!angular.isArray(allowedValues)) {
                throw 'allowedValues must be array';
            }
            if (allowedValues.length === 0) {
                throw 'allowedValues must have at least one value';
            }
            this._allowedValues = allowedValues;
            AbstractField.call(this, name, 'ENUM', defaultValue);
        }

        EnumField.prototype = Object.create(AbstractField.prototype);
        EnumField.prototype.validate = validate;
        EnumField.prototype.format = format;

        return EnumField;

        ////////////////

        function validate(value) {
            return this._allowedValues.indexOf(value) !== -1;
        }

        function format(value) {
            return value;
        }
    }
})();

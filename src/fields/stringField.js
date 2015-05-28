(function () {
    'use strict';

    angular
        .module('swissSettings')
        .factory('StringField', StringFieldFactory);

    function StringFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function StringField(name, defaultValue) {
            AbstractField.call(this, name, 'STRING', defaultValue);
        }

        StringField.prototype = Object.create(AbstractField.prototype);
        StringField.prototype.validate = validate;
        StringField.prototype.format = format;

        return StringField;

        ////////////////

        function validate(value) {
            return typeof value === 'string';
        }

        function format(value) {
            return value;
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('ObjectField', ObjectFieldFactory);

    function ObjectFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function ObjectField(name, defaultValue) {
            AbstractField.call(this, name, 'OBJECT', defaultValue);
        }

        ObjectField.prototype = Object.create(AbstractField.prototype);
        ObjectField.prototype.validate = validate;
        ObjectField.prototype.format = format;

        return ObjectField;

        ////////////////

        function validate(value) {
            return angular.isObject(value) && !angular.isArray(value);
        }

        function format(value) {
            return value;
        }
    }
})();

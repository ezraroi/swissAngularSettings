(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('AbstractField', AbstractFieldFactory);

    function AbstractFieldFactory($log, localStorageService) {
        /* jshint validthis: true */

        function AbstractField(name, typeName, defaultValue) {
            if (!name) {
                throw 'Name must be defined';
            }
            this.name = name;
            this.typeName = typeName;
            this.defaultValue = angular.isDefined(defaultValue) ?
                setDefaultValue.call(this, defaultValue) : undefined;
        }

        AbstractField.prototype = {
            getValue    : getValue,
            setValue    : setValue,
            getName     : getName,
            getTypeName : getTypeName,
            validate    : validate,
            format      : format,
            toJSON      : toJSON
        };

        return AbstractField;

        ////////////////

        function getValue() {
            var value = localStorageService.get(this.name);
            return angular.isDefined(value) && value !== null ? this.format(value) : this.defaultValue;
        }

        function setValue(value) {
            if (!this.validate(value)) {
                throw 'Invalid value: ' + value;
            }
            localStorageService.set(this.name, value);
            $log.debug('AbstractField: saved field ' + name + ' with value: ' + value);
        }

        function getName() {
            return this.name;
        }

        function getTypeName() {
            return this.typeName;
        }

        function validate() {
            throw 'This method is abstract';
        }

        function format() {
            throw 'This method is abstract';
        }

        function setDefaultValue(value) {
            if (!angular.isDefined(localStorageService.get(this.name))) {
                this.setValue(value);
            }
        }

        function toJSON() {
            return {
                Name: this.name,
                Type : this.typeName,
                DefaultValue: this.defaultValue,
                value: this.getValue()
            };
        }
    }
})();

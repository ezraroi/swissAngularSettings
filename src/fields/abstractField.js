(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('AbstractField', AbstractFieldFactory);

    function AbstractFieldFactory(localStorageService, $log) {
        /* jshint validthis: true */

        function AbstractField(name, typeName, defaultValue, storageDuration) {
            if (!name) {
                throw 'Name must be defined';
            }
            this.name = name;
            this.typeName = typeName;
            this.defaultValue = angular.isDefined(defaultValue) ? defaultValue : undefined;
            this.storageDuration = storageDuration;
            this.value = undefined;
            if (angular.isDefined(defaultValue)) {
                setDefaultValue.call(this, defaultValue);
            }
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

        var setTimePostFix = '_setTime';

        return AbstractField;

        ////////////////

        function getValue() {
            if (this.value === undefined) {
                this.value = localStorageService.get(this.name);
            }
            if (this.storageDuration) {
                var setDate = localStorageService.get(this.name + setTimePostFix);
                if (setDate && moment(setDate).add(this.storageDuration) < moment()) {
                    $log.debug('AbstractField: will clear ' + this.name + ' stored value as duration since ' +
                        'last set passed');
                    localStorageService.remove(this.name + setTimePostFix);
                    localStorageService.remove(this.name);
                    this.value = undefined;
                }
            }
            return angular.isDefined(this.value) && this.value !== null ? this.format(this.value) : this.defaultValue;
        }

        function setValue(value) {
            if (!this.validate(value)) {
                throw 'Invalid value: ' + value;
            }
            localStorageService.set(this.name, value);
            if (this.storageDuration) {
                localStorageService.set(this.name + setTimePostFix, new Date());
            }
            this.value = value;
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
            var stored = localStorageService.get(this.name);
            if (stored === null || !angular.isDefined(stored)) {
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

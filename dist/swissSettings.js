(function () {
    'use strict';

    angular
        .module('swissSettings', [
            'LocalStorageModule'
        ]);
})();
;(function () {
    'use strict';

    angular
        .module('swissSettings')
        .factory('AbstractField', AbstractFieldFactory);

    function AbstractFieldFactory($log, localStorageService) {
        /* jshint validthis: true */

        function AbstractField(name, typeName, defaultValue) {
            if (!name) {
                throw 'Name must be defined';
            }
            this.name = name;
            this.typeName = typeName;
            this.defaultValue = defaultValue || undefined;
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
            this.validate(value);
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
            throw new Error('AbstractField: This method is abstract');
        }

        function format() {
            throw new Error('AbstractField: This method is abstract');
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
    AbstractFieldFactory.$inject = ['$log', 'localStorageService'];
})();
;(function () {
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

        }

        function format(value) {
            return value;
        }
    }
    BooleanFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissSettings')
        .provider('swissSettingsService', swissSettingsService);

    function swissSettingsService() {
        /* jshint validthis:true */

        var service = this;
        service.registerBooleanField = registerBooleanField;
        service.registerStringField = registerStringField;
        service.registerIntegerField = registerIntegerField;
        service.registerArrayField = registerArrayField;
        service.registerEnumField = registerEnumField;
        service.registerObjectField = registerObjectField;
        service.$get = getService;

        var schema = [];

        getService.$inject = ['$log', '$injector'];
        return service;

        ////////////////

        /* @ngInject */
        function getService($log, $injector) {
            $log.debug('swissSettingsService: Creating settings service interface', schema);
            var fields = {};
            var settingsService = {};
            angular.forEach(schema, createItem);

            $log.debug('swissSettingsService: settingsService:', settingsService);

            return settingsService;

            function createItem(schemaItem) {
                $log.debug('swissSettingsService: createItem() - ', schemaItem);
                var Type = $injector.get(schemaItem.type);
                if (!Type) {
                    throw 'Unknown Type: ' + Type;
                }
                var fieldName = schemaItem.params[0];
                if (angular.isDefined(fields[fieldName])) {
                    throw 'Field ' + fieldName + ' already exists';
                }
                fields[fieldName] = Object.create(Type.prototype);
                Type.apply(fields[fieldName], schemaItem.params);
                var capitalized = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
                settingsService['get' + capitalized] = generateGetter(fieldName);
                settingsService['set' + capitalized] = generateSetter(fieldName);

                function generateGetter(fieldName) {
                    return function() {
                        return fields[fieldName].getValue();
                    };
                }

                function generateSetter(fieldName) {
                    return function(value) {
                        return fields[fieldName].setValue(value);
                    };
                }
            }
        }

        function registerBooleanField(name, defaultValue) {
            schema.push({
                type : 'BooleanField',
                params: arguments
            });
        }

        function registerStringField(name, defaultValue) {

        }

        function registerIntegerField(name, defaultValue) {

        }

        function registerArrayField(name, defaultValue) {

        }

        function registerEnumField(name, allowedValues, defaultValue) {

        }

        function registerObjectField(name, defaultValue) {

        }
    }
})();

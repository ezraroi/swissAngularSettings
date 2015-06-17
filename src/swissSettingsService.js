(function () {
    'use strict';

    angular
        .module('swissSettings')
        .provider('swissSettingsService', swissSettingsService);

    function swissSettingsService() {
        /* jshint validthis:true */

        var service = this;
        service.registerBooleanField = registerBooleanField;
        service.registerStringField = registerStringField;
        service.registerNumberField = registerNumberField;
        service.registerArrayField = registerArrayField;
        service.registerEnumField = registerEnumField;
        service.registerObjectField = registerObjectField;
        service.$get = getService;

        var schema = [];

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
            schema.push({
                type : 'StringField',
                params: arguments
            });
        }

        function registerNumberField(name, defaultValue) {
            schema.push({
                type : 'NumberField',
                params: arguments
            });
        }

        function registerArrayField(name, defaultValue) {
            schema.push({
                type : 'ArrayField',
                params: arguments
            });
        }

        function registerEnumField(name, allowedValues, defaultValue) {
            schema.push({
                type : 'EnumField',
                params: arguments
            });
        }

        function registerObjectField(name, defaultValue) {
            schema.push({
                type : 'ObjectField',
                params: arguments
            });
        }
    }
})();

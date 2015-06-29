(function () {
    'use strict';

    angular
        .module('swissAngularSettings', [
            'LocalStorageModule'
        ]);
})();
;(function () {
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
            this.defaultValue = angular.isDefined(defaultValue) ? this.setValue(defaultValue) : undefined;
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
        .module('swissAngularSettings')
        .factory('ArrayField', ArrayFieldFactory);

    function ArrayFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function ArrayField(name, defaultValue) {
            AbstractField.call(this, name, 'ARRAY', defaultValue);
        }

        ArrayField.prototype = Object.create(AbstractField.prototype);
        ArrayField.prototype.validate = validate;
        ArrayField.prototype.format = format;

        return ArrayField;

        ////////////////

        function validate(value) {
            return angular.isArray(value);
        }

        function format(value) {
            return value;
        }
    }
    ArrayFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
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
    BooleanFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
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
    EnumFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
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
    NumberFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
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
    ObjectFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
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
    StringFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
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

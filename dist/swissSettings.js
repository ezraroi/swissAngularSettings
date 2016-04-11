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
    AbstractFieldFactory.$inject = ['localStorageService', '$log'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('ArrayField', ArrayFieldFactory);

    function ArrayFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function ArrayField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'ARRAY', defaultValue, storageDuration);
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

        function BooleanField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'BOOLEAN', defaultValue, storageDuration);
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

        function EnumField(name, allowedValues, defaultValue, storageDuration) {
            if (!angular.isArray(allowedValues)) {
                throw 'allowedValues must be array';
            }
            if (allowedValues.length === 0) {
                throw 'allowedValues must have at least one value';
            }
            this._allowedValues = allowedValues;
            AbstractField.call(this, name, 'ENUM', defaultValue, storageDuration);
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
    NumberFieldFactory.$inject = ['AbstractField'];
})();
;(function () {
    'use strict';

    angular
        .module('swissAngularSettings')
        .factory('ObjectField', ObjectFieldFactory);

    function ObjectFieldFactory(AbstractField) {
        /* jshint validthis: true */

        function ObjectField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'OBJECT', defaultValue, storageDuration);
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

        function StringField(name, defaultValue, storageDuration) {
            AbstractField.call(this, name, 'STRING', defaultValue, storageDuration);
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
        .constant('serviceVersionKey', 'serviceVersion')
        .provider('swissSettingsService', swissSettingsService);

    function swissSettingsService() {
        /* jshint validthis:true */

        var service = this;
        service.setVersion = setVersion;
        service.registerBooleanField = registerBooleanField;
        service.registerStringField = registerStringField;
        service.registerNumberField = registerNumberField;
        service.registerArrayField = registerArrayField;
        service.registerEnumField = registerEnumField;
        service.registerObjectField = registerObjectField;
        service.$get = getService;

        var schema = [], serviceVersion;

        getService.$inject = ['$log', '$injector', 'localStorageService', 'serviceVersionKey'];
        return service;

        ////////////////

        /* @ngInject */
        function getService($log, $injector, localStorageService, serviceVersionKey) {
            $log.debug('swissSettingsService: Creating settings service interface', schema);
            var fields = {};
            var settingsService = {};
            angular.forEach(schema, createItem);

            checkServiceVersion();
            $log.debug('swissSettingsService: settingsService was created, version ' + serviceVersion);

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

            function checkServiceVersion() {
                var lastVersion = localStorageService.get(serviceVersionKey);
                if (serviceVersion && lastVersion !== serviceVersion) {
                    $log.debug('swissSettingsService: will clear local storage as new service version');
                    $log.debug('swissSettingsService: serviceVersion = ' +
                        serviceVersion + ', lastVersion = ' + lastVersion);
                    localStorageService.clearAll();
                    localStorageService.set(serviceVersionKey, serviceVersion);
                }
            }
        }

        function setVersion(version) {
            serviceVersion = version;
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

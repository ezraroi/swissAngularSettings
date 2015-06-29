[![Build Status](https://travis-ci.org/ezraroi/swissAngularSettings.svg?branch=master)](https://travis-ci.org/ezraroi/swissAngularSettings)
[![Dependency Status](https://gemnasium.com/ezraroi/swissAngularSettings.svg)](https://gemnasium.com/ezraroi/swissAngularSettings)
[![Coverage Status](https://coveralls.io/repos/ezraroi/swissAngularSettings/badge.svg?branch=master)](https://coveralls.io/r/ezraroi/swissAngularSettings?branch=master)
[![Code Climate](https://codeclimate.com/github/ezraroi/swissAngularSettings/badges/gpa.svg)](https://codeclimate.com/github/ezraroi/swissAngularSettings)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# Swiss Angular Settings

Angular provider which auto generates service for saving and getting values from the local storage based on a defined schema.

## Installation
You can install the swissAngularSettings with bower:
```bat
bower install swissAngularSettings --save
```

or you can add the swissAngularSettings.min.js file to your HTML page:
```html
<script src="swissAngularSettings.min.js"/>
```

## Dependencies
The swissAngularSettings depends on the following libraries:
* angular
* [angular-local-storage](https://github.com/grevory/angular-local-storage)

## Usage

Use the `swissSettingsServiceProvider` to define the schema of your desired settings service.
The schema of the settings service is a list of typed fields which can have a default value.
Field can be from one the following types:
* String
* Boolean
* Number
* Object
* Array
* Enum (Defined list of values)

**The service will use the type of the field for input validation and parsing**

### Defening your service schema
You can use the following methods of the `swissSettingsServiceProvider` to define your service schema:

* `registerBooleanField(name, [defaultValue])` - Adding a boolean field to your schema with the name `name` and the default value `defaultValue` (optional).
* `registerStringField(name, [defaultValue]` - Adding a string field to your schema with the name `name` and the default value `defaultValue` (optional).
* `registerNumberField(name, [defaultValue]` - Adding a number field to your schema with the name `name` and the default value `defaultValue` (optional).
* `registerArrayField(name, [defaultValue]` - Adding an array field to your schema with the name `name` and the default value `defaultValue` (optional).
* `registerEnumField(name, allowedValues, [defaultValue]` - Adding an enum field to your schema with the name `name` and the default value `defaultValue` (optional). The field will allow to save only the values defined `allowedValues` **array**
* `registerObjectField(name, [defaultValue]` - Adding an object field to your schema with the name `name` and the default value `defaultValue` (optional).

Example:
```javascript
    angular.module('myApp')
        .config(configure);

    function configure(swissSettingsServiceProvider) {
        swissSettingsServiceProvider.registerBooleanField('myBoolField', true);
        swissSettingsServiceProvider.registerBooleanField('myBoolField2');
        swissSettingsServiceProvider.registerEnumField('myEnumField', ['a','b'], 'b');
    }
```

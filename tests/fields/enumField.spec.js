'use strict';

describe('Enum Field', function() {

    var EnumField;

    beforeEach(module('swissSettings'));

    beforeEach(inject(function(_EnumField_) {
        EnumField = _EnumField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should fail when no allowed values given or invalid allowed values', function() {
        expect(function() {var a = new EnumField('test');})
            .toThrow('allowedValues must be array');
        expect(function() {var a = new EnumField('test', 1);})
            .toThrow('allowedValues must be array');
        expect(function() {var a = new EnumField('test', []);})
            .toThrow('allowedValues must have at least one value');
    });

    it('should set only valid values', function() {
        var tested = new EnumField('test', ['a', 'b', 'c']);

        tested.setValue('a');
        tested.setValue('b');
        tested.setValue('c');
        expect(function() {tested.setValue('d');}).toThrow('Invalid value: d');
        expect(function() {tested.setValue(1);}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue({});}).toThrow('Invalid value: [object Object]');
    });

    it('should fail when default value is not valid value', function() {
        expect(function() {var a = new EnumField('test', ['a', 'b', 'c'], 'd');})
            .toThrow('Invalid value: d');
    });

    it('should return ENUM type name', function() {
        var tested = new EnumField('test', ['a']);

        expect(tested.getTypeName()).toBe('ENUM');
    });

    it('should return undefined when no default value defined', function() {
        var tested = new EnumField('test', ['a']);

        expect(tested.getValue()).toBeUndefined();
    });

    it('should return default value when no value defined', function() {
        var tested = new EnumField('test', ['default'], 'default');

        expect(tested.getValue()).toBe('default');
    });

    it('should return the value that was set', function() {
        var tested = new EnumField('test', ['default', 'newVal'], 'default');
        var tested2 = new EnumField('test2', ['default', 'newVal'], 'default');

        expect(tested.getValue()).toEqual('default');
        tested.setValue('newVal');
        expect(tested.getValue()).toEqual('newVal');
        expect(tested2.getValue()).toEqual('default');
    });

});

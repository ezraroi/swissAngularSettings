'use strict';

describe('String Field', function() {

    var StringField;

    beforeEach(module('swissSettings'));

    beforeEach(inject(function(_StringField_) {
        StringField = _StringField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should set only valid values', function() {
        var tested = new StringField('test');
        tested.setValue('false');
        tested.setValue('true');

        expect(function() {tested.setValue(1);}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue({});}).toThrow('Invalid value: [object Object]');
    });

    it('should return STRING type name', function() {
        var tested = new StringField('test');

        expect(tested.getTypeName()).toBe('STRING');
    });

    it('should return undefined when no default value defined', function() {
        var tested = new StringField('test');

        expect(tested.getValue()).toBeUndefined();
    });

    it('should return default value when no value defined', function() {
        var tested = new StringField('test', 'default');

        expect(tested.getValue()).toBe('default');
    });

    it('should return the value that was set', function() {
        var tested = new StringField('test', 'default');
        var tested2 = new StringField('test2', 'default');

        expect(tested.getValue()).toBe('default');
        tested.setValue('newVal');
        expect(tested.getValue()).toBe('newVal');
        expect(tested2.getValue()).toBe('default');
    });

});

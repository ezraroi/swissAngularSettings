'use strict';

describe('Number Field', function() {

    var NumberField;

    beforeEach(module('swissSettings'));

    beforeEach(inject(function(_NumberField_) {
        NumberField = _NumberField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should set only valid values', function() {
        var tested = new NumberField('test');
        tested.setValue(1);
        tested.setValue(2.2);
        tested.setValue(123e5);
        tested.setValue(123e-5);

        expect(function() {tested.setValue('aa');}).toThrow('Invalid value: aa');
        expect(function() {tested.setValue('1');}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue({});}).toThrow('Invalid value: [object Object]');
    });

    it('should return NUMBER type name', function() {
        var tested = new NumberField('test');

        expect(tested.getTypeName()).toBe('NUMBER');
    });

    it('should return default value when no value defined', function() {
        var tested = new NumberField('test', 2);

        expect(tested.getValue()).toBe(2);
    });

    it('should return the value that was set', function() {
        var tested = new NumberField('test', 2);
        var tested2 = new NumberField('test2', 4);

        expect(tested.getValue()).toBe(2);
        expect(tested2.getValue()).toBe(4);
        tested.setValue(3);
        expect(tested.getValue()).toBe(3);
        expect(tested2.getValue()).toBe(4);
    });

});

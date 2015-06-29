'use strict';

describe('Array Field', function() {

    var ArrayField;

    beforeEach(module('swissAngularSettings'));

    beforeEach(inject(function(_ArrayField_) {
        ArrayField = _ArrayField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should set only valid values', function() {
        var tested = new ArrayField('test');
        tested.setValue(['a', 'b']);
        tested.setValue(['a', 1]);
        tested.setValue([{}, 2]);
        tested.setValue([]);

        expect(function() {tested.setValue(1);}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue({});}).toThrow('Invalid value: [object Object]');
    });

    it('should fail when default value is not valid value', function() {
        expect(function() {var a = new ArrayField('test', 'd');})
            .toThrow('Invalid value: d');

        expect(function() {var a = new ArrayField('test', 1);})
            .toThrow('Invalid value: 1');
    });

    it('should return ARRAY type name', function() {
        var tested = new ArrayField('test');

        expect(tested.getTypeName()).toBe('ARRAY');
    });

    it('should return undefined when no default value defined', function() {
        var tested = new ArrayField('test');

        expect(tested.getValue()).toBeUndefined();
    });

    it('should return default value when no value defined', function() {
        var tested = new ArrayField('test', ['default']);

        expect(tested.getValue()).toEqual(['default']);
    });

    it('should return the value that was set', function() {
        var tested = new ArrayField('test', ['default']);
        var tested2 = new ArrayField('test2', ['default']);

        expect(tested.getValue()).toEqual(['default']);
        tested.setValue(['newVal']);
        expect(tested.getValue()).toEqual(['newVal']);
        expect(tested2.getValue()).toEqual(['default']);
    });

});

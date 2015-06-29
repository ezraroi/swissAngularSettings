'use strict';

describe('Object Field', function() {

    var ObjectField;

    beforeEach(module('swissAngularSettings'));

    beforeEach(inject(function(_ObjectField_) {
        ObjectField = _ObjectField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should set only valid values', function() {
        var tested = new ObjectField('test');
        tested.setValue({});
        tested.setValue({a : 'a'});

        expect(function() {tested.setValue(1);}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue([]);}).toThrow('Invalid value: ');
    });

    it('should fail when default value is not valid value', function() {
        expect(function() {var a = new ObjectField('test', 'd');})
            .toThrow('Invalid value: d');

        expect(function() {var a = new ObjectField('test', 1);})
            .toThrow('Invalid value: 1');

        expect(function() {var a = new ObjectField('test', []);})
            .toThrow('Invalid value: ');
    });

    it('should return OBJECT type name', function() {
        var tested = new ObjectField('test');

        expect(tested.getTypeName()).toBe('OBJECT');
    });

    it('should return undefined when no default value defined', function() {
        var tested = new ObjectField('test');

        expect(tested.getValue()).toBeUndefined();
    });

    it('should return default value when no value defined', function() {
        var tested = new ObjectField('test', {default : 'default'});

        expect(tested.getValue()).toEqual({default : 'default'});
    });

    it('should return the value that was set', function() {
        var tested = new ObjectField('test', {default : 'default'});
        var tested2 = new ObjectField('test2', {default : 'default'});

        expect(tested.getValue()).toEqual({default : 'default'});
        tested.setValue({default : 'newVal'});
        expect(tested.getValue()).toEqual({default : 'newVal'});
        expect(tested2.getValue()).toEqual({default : 'default'});
    });

});

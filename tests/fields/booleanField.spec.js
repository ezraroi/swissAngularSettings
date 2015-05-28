'use strict';

describe('Boolean Field', function() {

    var BooleanField;

    beforeEach(module('swissSettings'));

    beforeEach(inject(function(_BooleanField_) {
        BooleanField = _BooleanField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should return boolean value always', function() {
        var tested = new BooleanField('test');
        tested.setValue(true);
        expect(tested.getValue()).toBeTruthy();

        tested.setValue(false);
        expect(tested.getValue()).toBeFalsy();

        tested.setValue('true');
        expect(tested.getValue()).toBeTruthy();

        tested.setValue('false');
        expect(tested.getValue()).toBeFalsy();
    });

    it('should set only valid values', function() {
        var tested = new BooleanField('test');
        tested.setValue(true);
        tested.setValue(false);
        tested.setValue('false');
        tested.setValue('true');

        expect(function() {tested.setValue(1);}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue('23432');}).toThrow('Invalid value: 23432');
        expect(function() {tested.setValue('1');}).toThrow('Invalid value: 1');
        expect(function() {tested.setValue({});}).toThrow('Invalid value: [object Object]');
    });

    it('should return BOOLEAN type name', function() {
        var tested = new BooleanField('test');

        expect(tested.getTypeName()).toBe('BOOLEAN');
    });

});

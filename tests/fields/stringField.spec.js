'use strict';

describe('String Field', function() {

    var StringField, localStorageService;

    beforeEach(module('swissAngularSettings'));

    beforeEach(inject(function(_StringField_, _localStorageService_) {
        StringField = _StringField_;
        localStorageService = _localStorageService_;
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

    it('should fail when default value is not valid value', function() {
        expect(function() {var a = new StringField('test', 1);})
            .toThrow('Invalid value: 1');
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

    it('should read from local storage only on first time', function() {
        var tested = new StringField('a');
        tested.setValue('abc');

        tested = new StringField('a');

        spyOn(localStorageService, 'get').and.callThrough();
        expect(tested.getValue()).toBe('abc');
        expect(tested.getValue()).toBe('abc');
        expect(localStorageService.get).toHaveBeenCalledWith('a');
        expect(localStorageService.get.calls.count()).toBe(1);
    });
});

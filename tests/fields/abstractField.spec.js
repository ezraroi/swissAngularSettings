'use strict';

describe('Abstract Field', function() {

    var AbstractField;

    beforeEach(module('swissSettings'));

    beforeEach(inject(function(_AbstractField_) {
        AbstractField = _AbstractField_;
    }));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should return the field name', function() {
        var tested = new AbstractField('a');
        expect(tested.getName()).toBe('a');
    });

    it('should throw error when name not given', function() {
        expect(function() {
            var a = new AbstractField();
        }).toThrow('Name must be defined');

    });

    it('should throw error when calling abstract methods', function() {
        expect(function() {
            var a = new AbstractField('a');
            a.validate(a);
        }).toThrow('This method is abstract');

        expect(function() {
            var a = new AbstractField('a');
            a.format('a');
        }).toThrow('This method is abstract');

    });
});

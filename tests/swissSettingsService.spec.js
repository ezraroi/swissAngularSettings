'use strict';

describe('swissSettingsService', function() {

    beforeEach(module('swissAngularSettings'));

    afterEach(inject(function(localStorageService) {
        localStorageService.clearAll();
    }));

    it('should throw error on duplicate fields', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.registerBooleanField('test');
            swissSettingsServiceProvider.registerBooleanField('test');
        });
        expect(function() {
            inject(function(swissSettingsService) {});
        }).toThrow('Field test already exists');
    });

    it('should return undefined when no default value given', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.registerBooleanField('test');
        });
        inject(function(swissSettingsService, localStorageService) {
            localStorageService.clearAll();
            expect(swissSettingsService.getTest()).toBeUndefined();
        });
    });

    it('should return default value when value was not set yet', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.registerBooleanField('test', true);
            swissSettingsServiceProvider.registerBooleanField('test2', false);
        });
        inject(function(swissSettingsService) {
            expect(swissSettingsService.getTest()).toBeTruthy();
            expect(swissSettingsService.getTest2()).toBeFalsy();
        });
    });

    it('should return value from local storage', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.registerBooleanField('test');
        });
        inject(function(swissSettingsService) {
            swissSettingsService.setTest(false);
            expect(swissSettingsService.getTest()).toBeFalsy();

            swissSettingsService.setTest(true);
            expect(swissSettingsService.getTest()).toBeTruthy();
        });
    });
});

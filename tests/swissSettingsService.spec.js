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

    it('should clear local storage on different service version when no ' +
        'version was defined before', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.setVersion('1');

        });

        inject(function($injector, localStorageService) {
            spyOn(localStorageService, 'clearAll').and.callThrough();
            $injector.get('swissSettingsService');
            expect(localStorageService.clearAll).toHaveBeenCalled();
        });
    });

    it('should clear local storage on different service version', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.setVersion('1');
        });

        inject(function($injector, localStorageService, serviceVersionKey) {
            spyOn(localStorageService, 'clearAll').and.callThrough();
            localStorageService.set(serviceVersionKey, '0');
            $injector.get('swissSettingsService');
            expect(localStorageService.clearAll).toHaveBeenCalled();
        });
    });

    it('should clear local storage on different service version', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.setVersion('1');
        });

        inject(function($injector, localStorageService, serviceVersionKey) {
            spyOn(localStorageService, 'clearAll').and.callThrough();
            localStorageService.set(serviceVersionKey, '0');
            $injector.get('swissSettingsService');
            expect(localStorageService.clearAll).toHaveBeenCalled();
        });
    });

    it('should not clear from local storage on the same version', function() {
        module(function(swissSettingsServiceProvider) {
            swissSettingsServiceProvider.setVersion('1');
        });

        inject(function($injector, localStorageService, serviceVersionKey) {
            spyOn(localStorageService, 'clearAll').and.callThrough();
            localStorageService.set(serviceVersionKey, '1');
            $injector.get('swissSettingsService');
            expect(localStorageService.clearAll.calls.count()).toEqual(0);
        });
    });
});

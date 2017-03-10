'use strict';

describe('TaskOverflowApp.version module', function() {
  beforeEach(module('TaskOverflowApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

/*global define*/
define([
  'underscore',
  'backbone',
  'AppModel'
], function(_, Backbone, AppModel) {
  'use strict';

  describe('AppModel', function() {

    it('should be a subclass of Backbone.Model', function() {
      AppModel.prototype.should.be.an.instanceof(Backbone.Model);
    });

  });

});

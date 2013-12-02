/*global define*/
define([
  'underscore',
  'backbone',
  'AppView'
], function(_, Backbone, AppView) {
  'use strict';

  describe('AppView', function() {

    it('should be a subclass of Backbone.View', function() {
      AppView.prototype.should.be.an.instanceof(Backbone.View);
    });

  });

});
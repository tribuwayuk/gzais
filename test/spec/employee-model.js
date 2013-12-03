/*global define*/
define([
  'underscore',
  'backbone',
  'EmployeeModel'
], function(_, Backbone, EmployeeModel) {
  'use strict';

  describe('EmployeeModel', function() {

    it('should be a subclass of Backbone.Model', function() {
      EmployeeModel.prototype.should.be.an.instanceof(Backbone.Model);
    });

  });

});
/*global define*/
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var EmployeeModel = Backbone.Model.extend({

    defaults: {
      'user-role': 'employee'
    }

  });

  return EmployeeModel;
});

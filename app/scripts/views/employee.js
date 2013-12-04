/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
], function($, _, Backbone, JST) {
  'use strict';

  var EmployeeView = Backbone.View.extend({

    className: 'employee-entry',

    tagName: 'tr',

    template: JST['app/scripts/templates/employee.ejs'],

    render: function() {
      var self = this;
      console.log(self.model);
      self.$el.html(self.template({model: self.model}));
      return self;
    }

  });


  return EmployeeView;
});

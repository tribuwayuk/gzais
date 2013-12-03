/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var EmployeesView = Backbone.View.extend({

        template: JST['app/scripts/templates/employees.ejs'],

        events: {
          'submit form': 'newEmployee'
        },

        newEmployee: function(e) {
          e.preventDefault();
        },

        render: function() {
          var self = this;
          self.$el.html(self.template());
          return self;
        }

    });

    return EmployeesView;
});
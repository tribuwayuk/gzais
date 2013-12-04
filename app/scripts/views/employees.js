/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'EmployeeView'
], function ($, _, Backbone, JST, EmployeeView) {
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
        },

        initialize: function() {
          var self = this;
          self.listenTo(self.collection, 'add', self.onAdd);
          self.collection.fetch();
        },

        onAdd: function(model) {
          var employee = new EmployeeView({model: model});
          console.log(employee.render().el);
        }

    });

    return EmployeesView;
});
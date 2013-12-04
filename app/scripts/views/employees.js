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
          'submit form': 'newEmployee',
          'click btn-add': 'newEmployee'
        },

        newEmployee: function(e) {
          e.preventDefault();
          var self        = this,
              form        = e.currentTarget,
              newEmployee = {};

          newEmployee.first_name    = form.first_name.value;
          newEmployee.middle_name   = form.middle_name.value;
          newEmployee.last_name     = form.last_name.value;
          newEmployee.email         = form.email.value;
          newEmployee.gender        = form.gender.value;
          newEmployee.date_of_birth = form.date_of_birth.value;
          newEmployee.date_employed = form.date_employed.value;
          newEmployee.user_role     = form.user_role.value;

          self.collection.add(newEmployee);
          
          $('#add-modal').modal('hide');

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
          var self = this;
          var employee = new EmployeeView({model: model});
          $('tbody.employees-list').prepend(employee.render().el);
        }

    });

    return EmployeesView;
});
/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'EmployeeView'
], function($, _, Backbone, JST, EmployeeView) {
  'use strict';

  var EmployeesView = Backbone.View.extend({

    template: JST['app/scripts/templates/employees.ejs'],

    events: {
      'submit form': 'newEmployee',
      'click btn-add': 'newEmployee'
    },
    errorFields: [],
    newEmployee: function(e) {
      e.preventDefault();
      var self        = this,
          form        = e.currentTarget,
          newEmployee = {};


      newEmployee.first_name    = self.fieldValidation(form.first_name, /^.{2,}$/);
      newEmployee.middle_name   = self.fieldValidation(form.middle_name, /^.{2,}$/);
      newEmployee.first_name    = self.fieldValidation(form.first_name, /^.{2,}$/);
      newEmployee.last_name     = self.fieldValidation(form.last_name, /^.{2,}$/);
      newEmployee.address       = self.fieldValidation(form.address, /^.{2,}$/);
      newEmployee.email         = self.fieldValidation(form.email, /^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/);
      newEmployee.gender        = form.gender.value;
      newEmployee.date_of_birth = self.fieldValidation(form.date_of_birth, /^.{2,}$/);
      newEmployee.date_employed = self.fieldValidation(form.date_employed, /^.{2,}$/);
      newEmployee.user_role     = form.user_role.value;

      if (self.errorFields.length === 0) {
        self.collection.add(newEmployee);
        // reset the form and hide the modal box
        form.reset();
        $('#add-modal').modal('hide');
      } else {

        self.errorFields = [];
      }

    },

    render: function() {
      var self = this;
      self.$el.html(self.template());
      return self;
    },

    initialize: function() {
      var self = this;
      self.listenTo(self.collection, 'add', self.addEmployee);
      self.collection.fetch();
    },

    addEmployee: function(model) {
      var self = this;
      var employee = new EmployeeView({
        model: model
      });
      $('tbody.employees-list').prepend(employee.render().el);
    },

    fieldValidation: function(field, regexp) {
      $(field).removeClass('error');
      if (field.value.match(regexp) !== null) {
        $(field).parent().removeClass('has-error');
        return field.value;
      } else {
        this.errorFields.pop(field.id);
        this.errorFields.push(field.id);
        return $(field).parent().addClass('has-error');
      }
    }

  });

  return EmployeesView;
});

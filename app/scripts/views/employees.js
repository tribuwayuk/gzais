/*global define*/

define(['jquery', 'underscore', 'backbone', 'templates', 'EmployeeView'], function($, _, Backbone, JST, EmployeeView) {

  'use strict';

  var EmployeesView = Backbone.View.extend({

    template: JST['app/scripts/templates/employees.ejs'],

    events: {
      'submit form#add-form': 'newEmployee',
      'hidden.bs.modal #edit-modal': 'resetForm',
      'hidden.bs.modal #add-modal': 'resetForm'
    },

    render: function() {
      var self = this;
      self.$el.html(self.template());
      return self;
    },

    resetForm: function(e) {
      var form = e.currentTarget.querySelector('form');
      form.reset();
      $(form).find('.has-error').removeClass('has-error');
    },

    initialize: function() {
      var self = this;
      self.listenTo(self.collection, 'add', self.onAdd);
      self.collection.fetch();
    },

    errorFields: [],

    newEmployee: function(e) {

      e.preventDefault();
      var self        = this,
          form        = e.currentTarget,
          newEmployee = {};

      newEmployee.first_name = self.fieldValidation(form.first_name, /^[a-zA-Z\s]{1,30}$/);
      newEmployee.middle_name = self.fieldValidation(form.middle_name, /^[a-zA-Z]{1,30}$/);
      newEmployee.last_name = self.fieldValidation(form.last_name, /^[a-zA-Z]{1,30}$/);
      newEmployee.address = self.fieldValidation(form.address, /^.{2,60}$/);
      newEmployee.email = self.fieldValidation(form.email, /^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/);
      newEmployee.gender = self.fieldValidation(form.gender, /^(male|female)$/);
      newEmployee.date_of_birth = self.fieldValidation(form.date_of_birth, /^\d{2}\/\d{2}\/\d{4}$/);
      newEmployee.date_employed = self.fieldValidation(form.date_employed, /^\d{2}\/\d{2}\/\d{4}$/);
      newEmployee.user_role = self.fieldValidation(form.user_role, /^(admin|custodian|employee)$/);
      newEmployee.password = 'admin123';

      if (self.errorFields.length === 0) {
        if (confirm('Do you want to save employee entry?')) {
          self.ajaxRequestSave(form, newEmployee);
        }
      } else {
        self.errorFields = [];
      }
    },

    ajaxRequestSave: function(form, data) {
      var self = this;
      $.post(self.collection.url, data).done(function(result) {
        if (!result.errors) {
          self.collection.add(result);
          form.reset();
          $('#add-modal').modal('hide');
        }
      });
    },

    onAdd: function(model) {
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

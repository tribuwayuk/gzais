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
      'submit form#addForm': 'newEmployee',
      'submit form#editForm': 'editEmployee',
      'click btn-add': 'newEmployee'
    },
    errorFields: [],
    newEmployee: function(e) {
      e.preventDefault();
      var self = this,
        form = e.currentTarget,
        newEmployee = {};


      newEmployee.first_name = self.fieldValidation(form.first_name, /^[a-zA-Z]{1,30}$/);
      newEmployee.middle_name = self.fieldValidation(form.middle_name, /^[a-zA-Z]{1,30}$/);
      newEmployee.last_name = self.fieldValidation(form.last_name, /^[a-zA-Z]{1,30}$/);
      newEmployee.address = self.fieldValidation(form.address, /^[a-zA-Z]{1,30}$/);
      newEmployee.email = self.fieldValidation(form.email, /^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/);
      newEmployee.gender = form.gender.value;
      newEmployee.date_of_birth = self.fieldValidation(form.date_of_birth, /^.{2,}$/);
      newEmployee.date_employed = self.fieldValidation(form.date_employed, /^.{2,}$/);
      newEmployee.user_role = form.user_role.value;

      if (self.errorFields.length === 0) {
        self.collection.add(newEmployee);
        form.reset();
        $('#add-modal').modal('hide');
      } else {

        self.errorFields = [];
      }

    },
    editEmployee: function(e) {
      e.preventDefault();
      var self = this,
        form = e.currentTarget,
        editEmployee = {};

      editEmployee.first_name = form.first_name.value;
      editEmployee.middle_name = form.middle_name.value;
      editEmployee.last_name = form.last_name.value;
      editEmployee.email = form.email.value;
      editEmployee.gender = form.gender.value;
      editEmployee.date_of_birth = form.date_of_birth.value;
      editEmployee.date_employed = form.date_employed.value;
      editEmployee.user_role = form.user_role.value;


      // to do: implement update collection.
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

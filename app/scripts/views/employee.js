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

    errorFields : [],

    template: JST['app/scripts/templates/employee.ejs'],
    editTemplate: JST['app/scripts/templates/employee-edit.ejs'],

    events: {
      'click .delete-employee' : 'deleteEmployee',
      'click .edit-employee'   : 'displayEditForm'
    },

    initialize: function() {
      var self = this;

      self.listenTo(self.model, 'change', self.render);
      // Proper way to handle deletion through events
      self.listenTo(self.model, 'remove', function(index) {
        var options = options || {};
        options.url = self.model.url() + '/' + self.model.get('_id');

        options.success = function() {
          return self.remove();
        };
        options.error = function() {
          console.log('error');
        };

        self.model.collection.sync('delete', self.model, options);
      });
    },

    displayEditForm: function(e) {
      e.preventDefault();
      var self = this;
      $('#edit-modal').empty();
      $('#edit-modal').append(self.editTemplate({
        model: this.model
      }));

      $('#edit-form').submit(function (e) {
        e.preventDefault();
          var form        = e.currentTarget,
            editEmployee  = self.model;
          
          editEmployee.set({'first_name'    : self.fieldValidation(form.first_name.value    , /^[a-zA-Z\s]{1,30}$/)                        });
          editEmployee.set({'middle_name'   : self.fieldValidation(form.middle_name.value   , /^[a-zA-Z]{1,30}$/)                          });
          editEmployee.set({'last_name'     : self.fieldValidation(form.last_name.value     , /^[a-zA-Z]{1,30}$/)                          });
          editEmployee.set({'address'       : self.fieldValidation(form.address.value       , /^.{2,60}$/)                                 });
          editEmployee.set({'email'         : self.fieldValidation(form.email.value         , /^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/) });
          editEmployee.set({'gender'        : self.fieldValidation(form.gender.value        , /^(male|female)$/)                           });
          editEmployee.set({'date_of_birth' : self.fieldValidation(form.date_of_birth.value , /^\d{2}\/\d{2}\/\d{4}$/)                     });
          editEmployee.set({'date_employed' : self.fieldValidation(form.date_employed.value , /^\d{2}\/\d{2}\/\d{4}$/)                     });
          editEmployee.set({'user_role'     : self.fieldValidation(form.user_role.value     , /^(admin|custodian|employee)$/)              });

          if (self.errorFields.length === 0) {
              self.updateEmployee(editEmployee);
          } else {
            self.errorFields = [];
          }
      });
    },

    updateEmployee: function(employee) {         
      var self = this;
      var id = self.model.get('_id');
      
      employee.unset('_id');

      employee.save({_id:id},{
        url: self.model.url() + '/' + id,
        method: 'put',
        wait: true,
        success: function () {
          $('#edit-modal').modal('hide');
        }

      });
    },

    deleteEmployee: function() {
      var self = this,
        bootbox = window.bootbox;

      // for implementation to delete data from db.
      bootbox.dialog({
        message: 'Are you sure you want to delete ' + self.model.get('first_name') + ' ' + self.model.get('last_name') + ' ?',
        title: "Confirm Deletion",
        buttons: {
          default: {
            label: " Cancel ",
            className: "btn-default",
            callback: function() {
              // Do nothing
            }
          },
          danger: {
            label: " Yes ",
            className: "btn-danger",
            callback: function() {
              // delete model.
              return self.model.collection.remove(self.model);
            }
          }
        }
      });
    },

    render: function() {
      var self = this;
      self.$el.html(self.template({
        model: self.model
      }));
      return self;
    }
  });

  return EmployeeView;
});

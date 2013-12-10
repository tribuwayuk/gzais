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
          
          editEmployee.set({'first_name':form.first_name.value});
          editEmployee.set({'middle_name':form.middle_name.value});
          editEmployee.set({'last_name':form.last_name.value});
          editEmployee.set({'email':form.email.value});
          editEmployee.set({'gender':form.gender.value});
          editEmployee.set({'date_of_birth':form.date_of_birth.value});
          editEmployee.set({'date_employed':form.date_employed.value});
          editEmployee.set({'user_role':form.user_role.value});

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

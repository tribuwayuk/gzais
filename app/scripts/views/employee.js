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
    editTemplate: JST['app/scripts/templates/employee-edit.ejs'],

    events: {
      'click .delete-employee': 'deleteEmployee',
      'click .edit-employee': 'displayEditForm'
    },

    initialize: function() {
      var self = this;
      // Proper way to handle deletion through events
      self.listenTo(self.model, 'remove', function(index) {
        return self.remove();
      });
    },

    displayEditForm: function(e) {
      e.preventDefault();
      var self = this;
      $('#edit-modal').empty();
      $('#edit-modal').append(self.editTemplate({
        model: this.model
      }));
    },

    deleteEmployee: function() {
      var self = this;
      // for implementation to delete data from db.
      if (confirm('Delete '+self.model.get('first_name')+' '+self.model.get('last_name')+' ?')) {
        // delete model.
        return self.model.collection.remove(self.model);
      }
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

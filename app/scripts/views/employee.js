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
      'click .deleteEmployee': 'deleteList',
      'click .editEmployee': 'displayEditForm'
    },

    displayEditForm: function(e) {
      e.preventDefault();
      var self = this;
      $('#edit-modal').empty();
      $('#edit-modal').append(self.editTemplate({
        model: this.model
      }));
    },

    deleteList: function() {
      // for implementation to delete data from db.

      // delete model.
      this.remove();
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

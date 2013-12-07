/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function($, _, Backbone, JST) {
  'use strict';

  var AssetView = Backbone.View.extend({

    className: 'asset-entry',

    tagName: 'tr',

    template: JST['app/scripts/templates/asset.ejs'],
    editTemplate: JST['app/scripts/templates/asset-edit.ejs'],

    events: {
      'click .delete-asset': 'deleteAsset',
      'click .edit-asset': 'displayEditForm'
    },

    initialize: function() {

      var self = this;
      // Proper way to handle deletion through events
      self.listenTo(self.model, 'remove', function(index) {
        var options = options || {};
        options.url = self.model.url() + '/' + self.model.get('_id');

        options.success = function() {
          return self.remove();
        };
        options.error = function() {
          console.error('error');
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

      // now let's bind to form's submit event
      $('#edit-modal form').submit(self.saveChanges);

    },

    saveChanges: function(e) {

      e.preventDefault();
      console.log(e.currentTarget);

    },

    deleteAsset: function() {
      var self  = this,
        bootbox = window.bootbox;

      // for implementation to delete data from db.
      bootbox.dialog({
        message: 'Are you sure you want to delete ' + self.model.get('asset_name') + ' ?',
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

  return AssetView;
});

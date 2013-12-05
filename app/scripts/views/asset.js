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
        return self.remove();
      });

    },

    displayEditForm: function(e){
      e.preventDefault();
      var self = this;
      console.log(this);
      $('#edit-modal').empty();
      $('#edit-modal').append(self.editTemplate({
        model: this.model
      }));
    },


    deleteAsset: function() {
      var self = this;
      // for implementation to delete data from db.
      if (confirm('Delete '+self.model.get('asset_name')+' ?')) {
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

  return AssetView;
});

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

    render: function() {
      var self = this;
      self.$el.html(self.template({
        model: self.model
      }));
      return self;
    },

    deleteAsset: function() {
      var self = this;
      // for implementation to delete data from db.
      if (confirm('Delete '+self.model.get('asset_name')+' ?')) {
        // delete model.
        return self.model.collection.remove(self.model);
      }
    }

  });

  return AssetView;
});

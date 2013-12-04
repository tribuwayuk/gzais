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

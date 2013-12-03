/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
], function($, _, Backbone, JST) {
  'use strict';

  var AssetsView = Backbone.View.extend({

    template: JST['app/scripts/templates/assets.ejs'],

    events: {
      'submit form': 'newAsset'
    },

    newAsset: function(e) {
      e.preventDefault();
      // TODO: handle form submission
    },

    render: function() {
      var self = this;
      self.$el.html(self.template());
      return self;
    },

  });


  return AssetsView;
});

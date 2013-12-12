/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AssetDetailsView = Backbone.View.extend({

        template  : JST['app/scripts/templates/asset-details.ejs'],
        className : 'asset-details',

        render : function(model) {
          var self = this;
          self.$el.html(self.template({model: self.model}));
          return self;
        },

    });

    return AssetDetailsView;
});
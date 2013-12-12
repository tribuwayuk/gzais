/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var InventoryReportsView = Backbone.View.extend({

        template : JST['app/scripts/templates/inventory-reports.ejs'],

        render: function() {
          var self = this;
          self.$el.html(self.template());
          return self;
        }

    });

    return InventoryReportsView;
});
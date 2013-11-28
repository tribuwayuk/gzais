/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function($, _, Backbone, JST) {
  'use strict';

  var AppView = Backbone.View.extend({

    el: $('#app'),

    template: JST['app/scripts/templates/app.ejs'],

    initialize: function() {

      var _self = this;
      _self.render();

    },

    render: function(config) {

      var _config = config || {};
      _config.title = _config.title || 'Global Zeal AIS';

      var _self = this;
      _self.$el.html(_self.template(_config));
      return _self;

    },

    events: {}

  });

  return AppView;
});

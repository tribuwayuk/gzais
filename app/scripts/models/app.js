/*global define*/
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var AppModel = Backbone.Model.extend({

    defaults: {
      title: 'Asset Inventory System',
      company: 'Global Zeal',
      team: 'Tribu Wayuk'
    },

    doLogin: function() {
      // TODO: do login implementation
    },

    doLogout: function() {
      // TODO: do logout implementation
    }

  });

  return AppModel;
});

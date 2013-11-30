/*global define*/
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var AppModel = Backbone.Model.extend({

    defaults: {
      title: 'Global Zeal AIS',
      company: {
        name: 'Global Zeal',
        url: 'http://www.globalzeal.net'
      },
      team: {
        name: 'Tribu Wayuk',
        url: 'http://tribuwayuk.com'
      }
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

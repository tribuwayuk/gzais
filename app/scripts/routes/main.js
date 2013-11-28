/*global define*/

define([
  'jquery',
  'backbone'
], function($, Backbone) {
  'use strict';

  var MainRouter = Backbone.Router.extend({

    routes: {
      'users': 'userList'
    }

  });

  return MainRouter;
});

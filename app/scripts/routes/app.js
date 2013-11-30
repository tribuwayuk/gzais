/*global define*/

define([
  'jquery',
  'backbone',
  'EmployeesView',
  'AssetsView'
], function($, Backbone, EmployeesView, AssetsView) {
  'use strict';

  var MainRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'assets': 'assets',
      'employees': 'employees'
    },

    initialize: function() {
      var self = this;
      self.app = window.App || {};
    },

    home: function() {

      var self = this;
      if (window.App.view.model.get('user')) {
        // if user is logged in then redirect
        return window.App.router.navigate(window.App.view.model.get('baseUrl'), {trigger: true});
      }

    },

    assets: function() {

      if (!window.App.view.model.get('user')) {
        return window.App.router.navigate('/', {trigger: true});
      }

      // mount assets view
      var assetsView = new AssetsView();
      window.App.view.model.set('currentContent', assetsView);

    },


    employees: function() {

      if (!window.App.view.model.get('user')) {
        return window.App.router.navigate('/', {trigger: true});
      }

      // mount employees view
      var employeesView = new EmployeesView();
      window.App.view.model.set('currentContent', employeesView);

    }

  });

  return MainRouter;
});

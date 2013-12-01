/*global define*/

define([
  'jquery',
  'backbone',
  'EmployeesView',
  'AssetsView',
  'InventoryReportsView'
], function($, Backbone, EmployeesView, AssetsView, InventoryReportsView) {
  'use strict';

  var MainRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'assets': 'assets',
      'employees': 'employees',
      'inventory-reports': 'inventoryReports'
    },

    initialize: function() {
      var self = this;
      self.app = window.App || {};
    },

    checkIfLoggedIn: function() {

      if (!window.App.view.model.get('user')) {
        
        // if not logged in then redirect to /
        window.location = '/';
        return false;

      }

    },

    mountSubView: function(name, SubView) {

      this.checkIfLoggedIn();

      /**
      * Mount Sub View
      */
      var appSubViews = window.App.view.subViews;
          appSubViews[name] = appSubViews[name] ? appSubViews[name] : new SubView();

      window.App.view.model.set('currentContent', appSubViews[name]);

    },

    home: function() {

      var self = this;
      if (window.App.view.model.get('user')) {
        // if user is logged in then redirect
        return window.App.router.navigate(window.App.view.model.get('baseUrl'), {trigger: true});
      }

    },

    assets: function() {

      this.mountSubView('assetsView', AssetsView);
      
    },


    employees: function() {

      this.mountSubView('employeesView', EmployeesView);

    },

    inventoryReports: function() {

      this.mountSubView('inventoryReportsView', InventoryReportsView);

    }

  });

  return MainRouter;
});

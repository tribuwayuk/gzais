/*global define*/

define([
  'jquery',
  'backbone',
  'EmployeesView',
  'AssetsView',
  'InventoryReportsView',
  'EmployeesCollection',
  'AssetsCollection'
], function($, Backbone, EmployeesView, AssetsView, InventoryReportsView, EmployeesCollection, AssetsCollection) {
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

    mountSubView: function(name, SubView, Collection) {

      if (!window.App.view.model.get('user')) {
        // if user is logged in then redirect
        return window.App.router.navigate(window.App.view.model.get('/'), {trigger: true});
      }
      /**
      * Mount Sub View
      */
      var appSubViews       = window.App.view.subViews,
          subView           = (name === 'inventoryReportsView') ? new SubView() : new SubView({collection: new Collection()});
          appSubViews[name] = appSubViews[name] ? appSubViews[name] : subView;

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
      this.mountSubView('assetsView', AssetsView, AssetsCollection);
    },


    employees: function() {
      this.mountSubView('employeesView', EmployeesView, EmployeesCollection);
    },

    inventoryReports: function() {
      this.mountSubView('inventoryReportsView', InventoryReportsView);
    }

  });

  return MainRouter;
});

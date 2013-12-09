/*global define*/

define([
  'jquery',
  'backbone',
  'EmployeesView',
  'AssetsView',
  'InventoryReportsView',
  'EmployeesCollection',
  'AssetsCollection',
  'AssetDetailsView'
], function($, Backbone, EmployeesView, AssetsView, InventoryReportsView, EmployeesCollection, AssetsCollection, AssetDetailsView) {
  'use strict';

  var MainRouter = Backbone.Router.extend({

    routes: {
      '': 'home',
      'assets': 'assets',
      'assets/:id': 'assetDetails',
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
          subView           = Collection === undefined ? SubView : new SubView({collection: new Collection()});
          appSubViews[name] = appSubViews[name] ? appSubViews[name] : subView;

      window.App.view.model.set('currentContent', appSubViews[name]);

    },

    home: function() {

      var self = this;
      if (window.App.view.model.get('user')) {
        // if user is logged in then redirect
        return window.App.router.navigate(window.App.view.model.get('baseUrl'), {trigger: true});
      }

      // reset SubViews
      window.App.view.subViews = {};

    },

    assets: function() {
      this.mountSubView('assetsView', AssetsView, AssetsCollection);
    },

    assetDetails: function(id) {
      console.log(window.App.view.model);
      var model = window.App.view.model.get('currentContent').collection.get(id);
      this.mountSubView('assetDetailsView', new AssetDetailsView({model: model}));
    },

    employees: function() {
      this.mountSubView('employeesView', EmployeesView, EmployeesCollection);
    },

    inventoryReports: function() {
      this.mountSubView('inventoryReportsView', new InventoryReportsView());
    }

  });

  return MainRouter;
});

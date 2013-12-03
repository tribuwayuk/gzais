/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    datepicker: {
      deps: ['jquery'],
      exports: 'datepicker'
    },
    selectpicker: {
      deps: ['jquery'],
      exports: 'selectpicker'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: 'vendor/bootstrap',
    datepicker: 'vendor/bootstrap-datepicker',
    selectpicker: 'vendor/bootstrap-select',
    AppModel: 'models/app',
    AppView: 'views/app',
    AppRouter: 'routes/app',
    EmployeesView: 'views/employees',
    EmployeesCollection: 'collections/employees',
    EmployeeView: 'views/employee',
    EmployeeModel: 'models/employee',
    AssetsView: 'views/assets',
    InventoryReportsView: 'views/inventory-reports'
  }
});

require([
  'backbone',
  'AppModel',
  'AppView',
  'AppRouter',
  'bootstrap',
  'datepicker',
  'selectpicker'
], function(Backbone, AppModel, AppView, AppRouter) {

  var App = {};

  // Init AppView
  App.view = new AppView({
    model: new AppModel({baseUrl: '/assets'})
  });

  // Init AppRouter
  App.router = new AppRouter();

  window.App = App;

  /**
   * An awesome way to handle click events with pushState
   * source: http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
   **/
  $(document).on('click', 'a[href^="/"]', function(e) {

    var href = $(e.currentTarget).attr('href');

    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {

      e.preventDefault();

      // Remove leading slashes and hash bangs (backward compatablility)
      var url = href.replace(/^\//, '').replace('#\/', '');
      App.router.navigate(url, {
        trigger: true
      });

      return false;
    }

  });

  //if (window.location.hash.indexOf('#') > -1) {
    //window.location = window.location.hash.substring(1);
  //}

  // Init Backbone.history
  Backbone.history.start({
    pushState: true
  });

});

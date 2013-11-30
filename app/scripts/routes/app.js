/*global define*/

define([
  'jquery',
  'backbone',
  'EmployeesView'
], function($, Backbone, EmployeesView) {
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
      // home
      var self = this;
      console.log('/');
    },

    employees: function() {
      // mount users
      var employeesView = new EmployeesView();
      $(window.App.view.contentSection)
      .empty()
      .html(employeesView.render().el);

    }

  });

  return MainRouter;
});

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

    loginTemplate: JST['app/scripts/templates/login-form.ejs'],

    mainTemplate: JST['app/scripts/templates/app-main.ejs'],

    initialize: function() {

      var self = this;

      self.listenTo(self.model, 'change:user', self.render);
      self.render();

    },

    events: {
      'submit form.login-form': 'doLogin'
    },

    render: function() {

      var self = this;

      // render app view
      self.$el.html(self.template({
        model: self.model
      }));

      // maiContainer holds main layout of the page
      var mainContainer = self.$el.find('.main > .container')[0];

      if (self.model.get('user')) {
        // logged in
        $(mainContainer).html(self.mainTemplate());
      } else {
        // if model.user is undefined then we're not logged in
        $(mainContainer).html(self.loginTemplate());
      }

      // .content-section
      self.contentSection = self.contentSection || self.$el.find('.content-section');

      return self;

    },

    doLogin: function(e) {

      e.preventDefault();

      var self          = this,
          form          = e.currentTarget,
          emailField    = form.email,
          passwordField = form.password;

      // Validations and shit
      if (!emailField.value.trim().match(/^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/)) {
        $(emailField).parent().addClass('has-error');
        return emailField.focus();
      }
      // removed .has-error and then un-focus
      $(emailField).parent().removeClass('has-error').blur();

      if (passwordField.value.trim().length < 6) {
        $(passwordField).parent().addClass('has-error');
        return passwordField.focus();
      }
      // removed .has-error and then un-focus
      $(passwordField).parent().removeClass('has-error').blur();

      if (emailField.value === 'admin@admin.com' && passwordField.value === 'admin123') {
        self.model.set('user', {email: emailField, password: passwordField});
      }

    }

  });

  return AppView;
});

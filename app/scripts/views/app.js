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

    subViews: {

    },

    template: JST['app/scripts/templates/app.ejs'],

    // Sub Templates
    loginTemplate: JST['app/scripts/templates/login-form.ejs'],
    mainTemplate: JST['app/scripts/templates/app-main.ejs'],
    
    initialize: function() {

      var self = this;

      // Setup data bindings
      self.listenTo(self.model, 'change:user', self.render);
      self.listenTo(self.model, 'change:currentContent', self.renderCurrentContent);

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

      // set containerDiv var to point to the <div class="container"></div>
      self.model.set('containerDiv', self.$el.find('.main > .container')[0]);

      if (self.model.get('user')) {

        // logged in
        $(self.model.get('containerDiv')).html(self.mainTemplate());
        // set contentSectionDiv var to point to the <div class="content-section"></div>
        self.model.set('contentSectionDiv', $(self.model.get('containerDiv')).find('.content-section')[0]);
        // redirect to /employees
        window.App.router.navigate(self.model.get('baseUrl'), {
          trigger: true
        });

      } else {

        // if model.user is undefined then we're not logged in
        $(self.model.get('containerDiv')).html(self.loginTemplate());

      }

      // .content-section

      return self;

    },

    renderCurrentContent: function() {

      var self = this;
      var contentSectionDiv = self.model.get('contentSectionDiv');
      // let's render
      $(contentSectionDiv)
      .hide()
      .html(self.model.get('currentContent').render().el).fadeIn(400);

      // handle .main-nav tabs
      self.handleMainNav();

    },

    handleMainNav: function() {

      // removed currently active li element
      $('.main-nav > li.active').removeClass('active');

      // check pathname
      switch(Backbone.history.location.pathname) {
        case "/assets":
          $('.main-nav > li.assets').addClass('active');
        break;
        case "/employees":
          $('.main-nav > li.employees').addClass('active');
        break;
        case "/inventory-reports":
          $('.main-nav > li.reports').addClass('active');
        break;

      }

    },

    doLogin: function(e) {

      e.preventDefault();

      var self = this,
        form = e.currentTarget,
        emailField = form.email,
        passwordField = form.password;

      /**
      * Login Form Validation
      **/
      if (!emailField.value.trim().match(/^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/)) {

        $(emailField).parent().addClass('has-error');
        return emailField.focus();

      }
      $(emailField).parent().removeClass('has-error').blur();

      if (passwordField.value.trim().length < 6) {

        $(passwordField).parent().addClass('has-error');
        return passwordField.focus();

      }
      $(passwordField).parent().removeClass('has-error').blur();

      if (emailField.value === 'admin@admin.com' && passwordField.value === 'admin123') {

        self.model.set('user', {
          email: emailField,
          password: passwordField
        });

      }

    }

  });

  return AppView;
});

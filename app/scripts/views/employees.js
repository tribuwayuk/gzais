/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var UserView = Backbone.View.extend({

        className: 'container',

        template: JST['app/scripts/templates/employees.ejs'],

        render: function() {
          var self = this;
          self.$el.html(self.template());
          return self;
        }

    });


    return UserView;
});
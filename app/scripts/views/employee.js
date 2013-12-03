/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var EmployeeView = Backbone.View.extend({

        template: JST['app/scripts/templates/employee.ejs'],

        render: function() {
          var self = this;
          self.$el.html(self.template());
          return self;
        }

    });


    return EmployeeView;
});
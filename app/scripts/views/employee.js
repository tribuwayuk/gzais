/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function($, _, Backbone, JST) {
    'use strict';

    var EmployeeView = Backbone.View.extend({

        className: 'employee-entry',

        tagName: 'tr',

        template: JST['app/scripts/templates/employee.ejs'],
        events: {
            'click .deleteEmployee': 'deleteList',
        },
        deleteList: function () {
          // for implementation to delete data from db.

          // delete model.
          this.remove();
        },
        render: function() {
            var self = this;
            self.$el.html(self.template({
                model: self.model
            }));
            return self;
        }
    });


    return EmployeeView;
});
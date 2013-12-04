/*global define*/
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var EmployeeModel = Backbone.Model.extend({
        validate: function(attrs) {
            if (!attrs.email) {
                alert( 'Please fill email field.');
            }

            if (!attrs.first_name) {
                return 'Please fill feedback field.';
            }
        }
    });

    return EmployeeModel;
});

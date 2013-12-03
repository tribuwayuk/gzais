/*global define*/

define([
    'underscore',
    'backbone',
    'models/employees'
], function (_, Backbone, EmployeesModel) {
    'use strict';

    var EmployeesCollection = Backbone.Collection.extend({
        model: EmployeesModel
    });

    return EmployeesCollection;
});
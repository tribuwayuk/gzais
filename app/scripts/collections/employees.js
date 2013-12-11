/*global define*/

define([
    'underscore',
    'backbone',
    'models/employee'
], function (_, Backbone, EmployeeModel) {
    'use strict';

    var EmployeesCollection = Backbone.Collection.extend({
        model: EmployeeModel,
        url: 'http://gzais-api.herokuapp.com/employees',
        urlRoot: 'http://gzais-api.herokuapp.com'
    });

    return EmployeesCollection;
});
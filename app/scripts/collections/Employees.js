define([
    'underscore',
    'backbone',
    'models/Employee'
], function (_, Backbone, Employee) {
    'use strict';

    var Employees = Backbone.Collection.extend({

        model   : Employee,
        url     : 'http://gzais-api.herokuapp.com/employees',
        urlRoot : 'http://gzais-api.herokuapp.com'

    });

    return Employees;
});
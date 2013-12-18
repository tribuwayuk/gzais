/*global define*/

define([
    'underscore',
    'backbone',
    'models/InventoryReport'
], function (_, Backbone, InventoryReport) {
    'use strict';

    var InventoryReports = Backbone.Collection.extend({

        model : InventoryReport,
        url   : 'http://gzais-api.herokuapp.com/assets'

    });
    return InventoryReports;
});
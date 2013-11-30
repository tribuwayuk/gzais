/*global define*/

define([
    'underscore',
    'backbone',
    'models/assets'
], function (_, Backbone, AssetsModel) {
    'use strict';

    var AssetsCollection = Backbone.Collection.extend({
        model: AssetsModel
    });

    return AssetsCollection;
});
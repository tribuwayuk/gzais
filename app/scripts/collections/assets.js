/*global define*/

define([
    'underscore',
    'backbone',
    'models/asset'
], function (_, Backbone, AssetModel) {
    'use strict';

    var AssetsCollection = Backbone.Collection.extend({
        model: AssetModel,
        url: 'http://localhost:3000/assets'
    });

    return AssetsCollection;
});
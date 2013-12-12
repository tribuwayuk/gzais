/*global define*/

define([
    'underscore',
    'backbone',
    'models/asset'
], function (_, Backbone, AssetModel) {
    'use strict';

    var AssetsCollection = Backbone.Collection.extend({
        model: AssetModel,
        url: 'http://gzais-api.herokuapp.com/assets'
    });

    return AssetsCollection;
});
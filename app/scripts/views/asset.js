/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AssetView = Backbone.View.extend({
        template: JST['app/scripts/templates/asset.ejs']
    });

    return AssetView;
});
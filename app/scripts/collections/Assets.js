/*global define*/

define([
    'underscore',
    'backbone',
    'models/Asset'
], function (_, Backbone, Asset) {
    'use strict';

    var Assets = Backbone.Collection.extend({

        model : Asset,
        url   : 'http://gzais-api.herokuapp.com/assets'
     
    });

    return Assets;
});
define([
    'underscore',
    'backbone',
    'models/Asset'
], function (_, Backbone, Asset) {
    'use strict';

    var Assets = Backbone.Collection.extend({

        model : Asset,
        //url   : 'http://gzais-api.herokuapp.com/assets'
        url     : 'http://localhost:3000/assets'

    });

    return Assets;
});
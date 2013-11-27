/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        defaults: {
        }
    });

    console.log('im a user');
    return UserModel;
});
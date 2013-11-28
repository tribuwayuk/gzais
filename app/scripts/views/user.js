/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var UserView = Backbone.View.extend({
        template: JST['app/scripts/templates/user.ejs']
    });

    return UserView;
});
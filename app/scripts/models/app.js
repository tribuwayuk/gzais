/*global define*/
define( [
    'underscore',
    'backbone'
], function( _, Backbone ) {

    'use strict';

    var App = Backbone.Model.extend( {

        defaults : {
            title   : 'Global Zeal AIS',
            company : {
                name : 'Global Zeal',
                url  : 'http://www.globalzeal.net'
            },
            team	: {
                name : 'Tribu Wayuk',
                url  : 'http://tribuwayuk.com'
            }
        }

    } );

    return App;
} );

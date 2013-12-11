/*global define*/

define( [
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function( $, _, Backbone, JST ) {
    'use strict';

    var EmployeeDetailsView = Backbone.View.extend( {

        template: JST[ 'app/scripts/templates/employee-details.ejs' ],

        className: 'employee-details',

        render: function( model ) {
            var self = this;
            self.$el.html( self.template( {
                model: self.model
            } ) );
            return self;
        },

        initialize: function( ) {}

    } );

    return EmployeeDetailsView;
} );

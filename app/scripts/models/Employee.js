define( [
    'underscore',
    'backbone'
], function( _, Backbone ) {
    'use strict';

    var _formatDate = function( d ) {

        var date   = new Date( d );
        var _month = ( date.getMonth( ) + 1 < 10 ) ? '0' + ( date.getMonth( ) + 1 ) : '' + ( date.getMonth( ) + 1 );
        var _date  = ( date.getDate( ) < 10 ) ? '0' + date.getDate( ) : '' + date.getDate( );
        var _year  = date.getFullYear( );

        return _month + '/' + _date + '/' + _year;

    };

    var Employee = Backbone.Model.extend( {

        defaults       : { assets: 0 },
        idAttribute    : '_id',

        getDateOfBirth : function( ) {

            return _formatDate( this.get( 'date_of_birth' ) );

        },

        getDateEmployed : function( ) {

            return _formatDate( this.get( 'date_employed' ) );

        },

        getFullName : function( ) {

            return this.get( 'first_name' ) + ' ' + this.get( 'last_name' );

        },

    } );

    return Employee;
} );

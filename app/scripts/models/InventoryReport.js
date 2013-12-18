define( [
    'underscore',
    'backbone'
], function ( _, Backbone ) {
    'use strict';

    var InventoryReport = Backbone.Model.extend( {

        defaults: {},
        idAttribute: '_id',

        getDatePurchased: function ( ) {

            var date   = new Date( this.get( 'date_purchased' ) );
            var _month = ( date.getMonth( ) + 1 < 10 ) ? '0' + ( date.getMonth( ) + 1 ) : '' + ( date.getMonth( ) + 1 );
            var _date  = ( date.getDate( ) < 10 ) ? '0' + date.getDate( ) : '' + date.getDate( );
            var _year  = date.getFullYear( );

            return _month + '/' + _date + '/' + _year;

        },
        getFullName: function ( ) {
            var fullName = 'Not Yet Assigned';

            if ( this.get( 'assignee' ) !== null ) {
                fullName = this.get( 'assignee' ).first_name + ' ' + this.get( 'assignee' ).last_name;
            }

            return fullName;
        },

    } );

    return InventoryReport;
} );
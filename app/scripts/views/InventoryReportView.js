/*global define*/

define( [
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ( $, _, Backbone, JST ) {
    'use strict';

    var InventoryReportView = Backbone.View.extend( {
        className : 'inventory-entry',
        tagName   : 'tr',
        template  : JST[ 'app/scripts/templates/inventory-report.ejs' ],

        events: {
            'click .view-items-details' : 'viewItemDetails'
        },

        initialize: function ( ) {

        },

        viewItemDetails : function ( e ) {
            var target = $( e.currentTarget );

            if( target.siblings( '.items-views-detail' ).hasClass( 'hide' ) ) {
				$('.items-views-detail').addClass('hide');
				target.addClass('selected-item-views');
				target.siblings( '.items-views-detail' ).removeClass( 'hide' );
            } else {
            	target.removeClass('selected-item-views');
				target.siblings( '.items-views-detail' ).addClass( 'hide' );
			}
        },

        render: function ( ) {
            var self = this;

            self.$el.html( self.template( {
                model: self.model
            } ) );

            return self;
        }

    } );

    return InventoryReportView;
} );
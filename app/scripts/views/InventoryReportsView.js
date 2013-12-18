/*global define*/
define( [ 'jquery', 'underscore', 'backbone', 'templates', 'InventoryReportView' ], function ( $, _, Backbone, JST, InventoryReportView ) {

    'use strict';

    var InventoryReportsView = Backbone.View.extend( {

        template   : JST[ 'app/scripts/templates/inventory-reports.ejs' ],
        initialize : function ( ) {
            var self = this;
            self.listenTo( self.collection, 'add', self.onAdd );
            self.collection.fetch( );
        },

        onAdd: function ( model ) {

            var self = this;

            var inventoryReport = new InventoryReportView( {
                model: model
            } );

            $( 'tbody.inventory-list' ).prepend( inventoryReport.render( ).el );
        },

        render: function ( ) {
            var self = this;
            self.$el.html( self.template( ) );
            return self;
        }

    } );

    return InventoryReportsView;
} );
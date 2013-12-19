/*global define*/
define( [ 'jquery', 'underscore', 'backbone', 'templates', 'InventoryReportView' ], function ( $, _, Backbone, JST, InventoryReportView ) {

    'use strict';

    var InventoryReportsView = Backbone.View.extend( {

        template : JST[ 'app/scripts/templates/inventory-reports.ejs' ],

        events   : {
            'change .inventory-filter'   : 'inventoryFilter'
        },

        initialize : function ( ) {
            var self = this;
            self.listenTo( self.collection, 'add', self.onAdd );
            self.collection.url += "?access_token=" + window.App.view.model.get('access_token');

			self.collection.fetch( );
        },

        inventoryFilter : function ( model ) {
			var ele = document.querySelectorAll(".selectpicker > div.filter-option");

			var inventoryReport = new InventoryReportView( {
                model: model
            } );

            $( 'tbody.inventory-list' ).prepend( inventoryReport.render( ).el );
			return (ele[0].innerHTML);
        },

        onAdd: function ( model ) {

            var self = this;
            var filterModel;

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
define( [
    'jquery',
    'backbone',
    'EmployeesView',
    'AssetsView',
    'InventoryReportsView',
    'EmployeesCollection',
    'EmployeeDetailsView',
    'AssetsCollection',
    'AssetDetailsView'
], function( $, Backbone, EmployeesView, AssetsView, InventoryReportsView, EmployeesCollection, EmployeeDetailsView, AssetsCollection, AssetDetailsView ) {

    'use strict';

    var MainRouter = Backbone.Router.extend( {

        routes: {
            '':						'home',
            'assets':				'assets',
            'assets/:id':			'assetDetails',
            'employees':			'employees',
            'employees/:id':		'employeeDetails',
            'inventory-reports':	'inventoryReports'
        },

        initialize: function( ) {

            var self = this;
            self.app = window.App || {};

        },

        mountSubView: function( name, subView ) {

            if ( !window.App.view.model.get( 'user' ) ) {
                return window.App.router.navigate( window.App.view.model.get( '/' ), {
                    trigger: true
                } );
            }

            var appSubViews		= window.App.view.subViews;
            appSubViews[ name ] = appSubViews[ name ] ? appSubViews[ name ] : subView;

            window.App.view.model.set( 'currentContent', appSubViews[ name ] );
            return subView;

        },

        home: function( ) {

            var self = this;
            if ( window.App.view.model.get( 'user' ) ) {

                return window.App.router.navigate( window.App.view.model.get( 'baseUrl' ), {
                    trigger: true
                } );
                
            }

            // reset SubViews
            window.App.view.subViews = {};

        },

        assets: function( ) {

            window.App.view.subViews = {};

            this.mountSubView( 'assetsView', new AssetsView( {
                collection: new AssetsCollection( )
            } ) );

        },

        assetDetails: function( id ) {

            var model = window.App.view.model.get( 'currentContent' ).collection.get( id );
            this.mountSubView( id, new AssetDetailsView( {
                model: model
            } ) );

        },

        employees: function( ) {

            this.mountSubView( 'employeesView', new EmployeesView( {
                collection: new EmployeesCollection( )
            } ) );

        },

        employeeDetails: function( id ) {

            var model = window.App.view.model.get( 'currentContent' ).collection.get( id );
            this.mountSubView( id, new EmployeeDetailsView( {
                model: model
            } ) );

        },

        inventoryReports: function( ) {

            this.mountSubView( 'inventoryReportsView', new InventoryReportsView( ) );

        }

    } );

    return MainRouter;
} );

/*global define*/

define( [
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ( $, _, Backbone, JST ) {
    'use strict';

    var AssetDetailsView = Backbone.View.extend( {

        template: JST[ 'app/scripts/templates/asset-details.ejs' ],
        editTemplate        : JST['app/scripts/templates/asset-edit.ejs'],
        className: 'asset-details',
        errorFields: [ ],
        events: {
            //'submit form#edit-form' : 'updateAsset',
            'click .delete-asset'   : 'deleteAsset',
            'click .edit-asset'		: 'displayEditForm'
        },

        initialize: function ( ) {

            var self = this;

            self.listenTo( self.model, 'remove', function ( index ) {

                var options = options || {};
                options.url = self.model.url( );

                options.success = function ( ) {
                    window.App.router.navigate( '/assets', true );
                    return self.remove( );
                };
                options.error = function ( ) {
                    console.error( 'error' );
                };

                self.model.collection.sync( 'delete', self.model, options );
            } );

        },
        displayEditForm: function ( e ) {

            var self = this;

            $( '#edit-modal' ).empty( );
            $( '#edit-modal' ).append( self.editTemplate( {
                model: self.model
            } ) );

            $( '#edit-form' ).submit( self.updateAsset.bind( self ) );

        },


        updateAsset: function ( e ) {

            e.preventDefault( );

            var self = this;
            var form = e.currentTarget;
            var data = {};

            data.asset_name        = self.fieldValidation( form.asset_name, /^[a-zA-Z0-9\.\-\,\''\s]{3,30}$/ );
            data.asset_type        = self.fieldValidation( form.asset_type, /^[a-zA-Z0-9\s]{3,30}$/ );
            data.date_purchased    = self.fieldValidation( form.date_purchased, /^\d{2}\/\d{2}\/\d{4}$/ );
            data.status            = self.fieldValidation( form.status, /^(working|defective)$/ );
            data.serial_number     = self.fieldValidation( form.serial_number, /^[a-zA-Z0-9-\s]{5,30}$/ );
            data.supplier          = self.fieldValidation( form.supplier, /^[a-zA-Z0-9\.\-\,\&\s]{5,160}$/ );
            data.reason            = self.fieldValidation( form.reason, /^.{5,160}$/ );
            data.asset_description = self.fieldValidation( form.asset_description, /^.{5,160}$/ );

            if ( self.errorFields.length === 0 ) {

                $( 'input, button, option, textarea' ).prop( 'disabled', true );
                $( '.btns' ).addClass( 'loading' );

                self.model.save( data, {
                    success: function ( ) {
                        $( '#edit-modal' ).modal( 'hide' );
                        $( 'input, button, option, textarea' ).prop( 'disabled', false );
                        $( '.btns' ).removeClass( 'loading' );
                        self.render( );
                    },
                    error: function ( ) {
                        $( '#edit-modal' ).modal( 'hide' );
                    }
                } );

            } else {

                self.errorFields = [ ];

            }

        },

        fieldValidation: function ( field, regexp ) {
            $( field ).removeClass( 'error' );
            if ( field.value.match( regexp ) !== null ) {
                $( field ).parent( ).removeClass( 'has-error' );
                return field.value;
            } else {
                this.errorFields.pop( field.id );
                this.errorFields.push( field.id );
                return $( field ).parent( ).addClass( 'has-error' );
            }
        },

        render: function ( model ) {
            var self = this;
            self.$el.html( self.template( {
                model: self.model
            } ) );
            return self;
        },

        deleteAsset: function ( ) {

            var self = this;
            var bootbox = window.bootbox;

            bootbox.dialog( {
                message: 'Are you sure you want to delete ' + self.model.get( 'asset_name' ) + ' ?',
                title: "Confirm Deletion",
                buttons: {
                    default: {
                        label: " Cancel ",
                        className: "btn-default",
                        callback: function ( ) {}
                    },
                    danger: {
                        label: " Yes ",
                        className: "btn-danger",
                        callback: function ( ) {
                            return self.model.collection.remove( self.model );
                        }
                    }
                }
            } );
        },

    } );

    return AssetDetailsView;
} );

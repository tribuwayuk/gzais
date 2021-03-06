/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AssetView = Backbone.View.extend({

        className           : 'asset-entry',
        tagName             : 'tr',
        errorFields         : [],
        template            : JST['app/scripts/templates/asset.ejs'],
        editTemplate        : JST['app/scripts/templates/asset-edit.ejs'],
        assignAssetTemplate : JST['app/scripts/templates/asset-assign.ejs'],

        events: {
            'click .delete-asset' : 'deleteAsset',
            'click .edit-asset'   : 'displayEditForm',
            'click .assign-asset' : 'displaySearchName',
        },

        displaySearchName: function ( e ) {
            e.preventDefault( );
            var self         = this;
            var searchDivID  = '#div' + self.model.id;
            var assigneeTDID = '#assignee_' + this.model.id;
            var firstname    = window.App.view.model.attributes.user.first_name;
            var lastname    = window.App.view.model.attributes.user.last_name;
            var loggedin_user = firstname + " " + lastname;

            $( searchDivID ).show( );

            $( searchDivID ).on( 'change', function ( e ) {
                var name          = e.val;
                var assigned_to   = e.added['_id'];

                self.model.save( {
                    assignee      : assigned_to,
                    loggedin_user : loggedin_user
                }, {
                    success: function ( data ) {
                        $( assigneeTDID ).html( name );
                        $( searchDivID ).hide( );
                        self.model.fetch( );
                    },
                    error: function ( ) {
                        $( searchDivID ).hide( );
                    }
                });
            });
        },

        initialize: function () {

            var self = this;

            self.listenTo(self.model, 'remove', function ( index ) {

                var options = options || {};
                options.url = self.model.url( );

                options.success = function ( ) {
                    return self.remove( );
                };
                options.error = function ( ) {
                    console.error( 'error' );
                };

                self.model.collection.sync( 'delete', self.model, options );
            });

        },

        displayEditForm: function ( e ) {

            var self = this;

            $( '#edit-modal' ).empty( );
            $( '#edit-modal' ).append( self.editTemplate( {
                model: self.model
            } ) );

            console.log(self.model.urlRoot());

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
            data.supplier          = self.fieldValidation( form.supplier, /^[a-zA-Z0-9\-\.\,\&\s]{5,160}$/ );
            data.reason            = self.fieldValidation( form.reason, /^.{5,160}$/ );
            data.asset_description = self.fieldValidation( form.asset_description, /^.{5,160}$/ );
            data.assignee          = self.model.get( 'assignee' )._id;

            if ( self.errorFields.length === 0 ) {

                $( 'input, button, option, textarea' ).prop( 'disabled', true );
                $( '.btns' ).addClass( 'loading' );


                self.model.save( data, {
                    success: function ( ) {
                        self.render( );
                        $( '#edit-modal' ).modal( 'hide' );
                        $( 'input, button, option, textarea' ).prop( 'disabled', false );
                        $( '.btns' ).removeClass( 'loading' );
                    },
                    error: function ( ) {
                        $( '#edit-modal' ).modal( 'hide' );
                    }
                });

            } else {

                self.errorFields = [];

            }

        },

        deleteAsset: function () {

            var self = this;
            var bootbox = window.bootbox;

            bootbox.dialog({
                message: 'Are you sure you want to delete ' + self.model.get('asset_name') + ' ?',
                title: "Confirm Deletion",
                buttons: {
                    default: {
                        label     : " Cancel ",
                        className : "btn-default",
                        callback  : function () {}
                    },
                    danger: {
                        label     : " Yes ",
                        className : "btn-danger",
                        callback  : function () {
                            return self.model.collection.remove(self.model);
                        }
                    }
                }
            });
        },

        render: function () {
            var self = this;

            self.$el.html(self.template({
                model: self.model
            }));
            return self;
        },

        fieldValidation: function (field, regexp) {
            $(field).removeClass('error');
            if (field.value.match(regexp) !== null) {
                $(field).parent().removeClass('has-error');
                return field.value;
            } else {
                this.errorFields.pop(field.id);
                this.errorFields.push(field.id);
                return $(field).parent().addClass('has-error');
            }
        }

    });

    return AssetView;
});

/*global define*/

define( [
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function( $, _, Backbone, JST ) {
    'use strict';

    var EmployeeView = Backbone.View.extend( {

        className: 'employee-entry',

        tagName: 'tr',

        errorFields: [ ],

        template: JST[ 'app/scripts/templates/employee.ejs' ],
        editTemplate: JST[ 'app/scripts/templates/employee-edit.ejs' ],

        events: {
            'click .delete-employee': 'deleteEmployee',
            'click .edit-employee': 'displayEditForm',
            'click .reset-password': 'displayResetForm'
        },

        initialize: function( ) {
            var self = this;

            // Proper way to handle deletion through events
            self.listenTo( self.model, 'remove', function( index ) {
                var options = options || {};
                options.url = self.model.url( ) + '/' + self.model.get( '_id' );

                options.success = function( ) {
                    return self.remove( );
                };
                options.error = function( ) {
                    console.log( 'error' );
                };

                self.model.collection.sync( 'delete', self.model, options );
            } );
        },

        displayResetForm: function( ) {
            var self = this,
                bootbox = window.bootbox;

            // for implementation to delete data from db.
            bootbox.dialog( {
                message: 'Do you want to reset password for ' + self.model.get( 'first_name' ) + ' ' + self.model.get( 'last_name' ) + ' ?',
                title: "Confirm Reset Password",
                buttons: {
                    default: {
                        label: " Cancel ",
                        className: "btn-default",
                        callback: function( ) {
                        }
                    },
                    danger: {
                        label: " Yes ",
                        className: "btn-danger",
                        callback: function( ) {
                            return self.resetPassword( self );
                        }
                    }
                }
            } );
        },
        resetPassword: function( self ) {
            var urlRoot = self.model.collection.urlRoot + "/resetPassword/" + self.model.get( '_id' );

            $.ajax( {
                'type': "POST",
                'url': urlRoot,
                'success': function( ) {
                    console.log( 'success!' );
                },
            } );
        },

        displayEditForm: function( e ) {
            e.preventDefault( );
            var self = this;
            $( '#edit-modal' ).empty( );
            $( '#edit-modal' ).append( self.editTemplate( {
                model: self.model
            } ) );

            $( '#edit-form' ).submit( self.updateEmployee.bind( self ) );
        },

        updateEmployee: function( e ) {
            e.preventDefault( );

            var self = this;
            var form = e.currentTarget;
            var data = {};

            data.first_name    = self.fieldValidation( form.first_name, /^[a-zA-Z\s]{1,30}$/ );
            data.middle_name   = self.fieldValidation( form.middle_name, /^[a-zA-Z\s]{1,30}$/ );
            data.last_name     = self.fieldValidation( form.last_name, /^[a-zA-Z\s]{1,30}$/ );
            data.address       = self.fieldValidation( form.address, /^.{2,60}$/ );
            data.email         = self.fieldValidation( form.email, /^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/ );
            data.gender        = self.fieldValidation( form.gender, /^(male|female)$/ );
            data.date_of_birth = self.fieldValidation( form.date_of_birth, /^\d{2}\/\d{2}\/\d{4}$/ );
            data.date_employed = self.fieldValidation( form.date_employed, /^\d{2}\/\d{2}\/\d{4}$/ );
            data.user_role     = self.fieldValidation( form.user_role, /^(admin|custodian|employee)$/ );

            if ( self.errorFields.length === 0 ) {
                $( 'input, button, option, textarea' ).prop( 'disabled', true );
                $( '.btns' ).addClass( 'loading' );

                self.model.save( data, {
                    success: function( ) {
                        self.render( );
                        $( '#edit-modal' ).modal( 'hide' );
                        $( 'input, button, option, textarea' ).prop( 'disabled', false );
                        $( '.btns' ).removeClass( 'loading' );
                    },
                    error: function( ) {
                        $( '#edit-modal' ).modal( 'hide' );
                    }
                } );

            } else {
                self.errorFields = [ ];
            }
        },

        deleteEmployee: function( ) {
            var self = this,
                bootbox = window.bootbox;

            // for implementation to delete data from db.
            bootbox.dialog( {
                message: 'Are you sure you want to delete ' + self.model.get( 'first_name' ) + ' ' + self.model.get( 'last_name' ) + ' ?',
                title: "Confirm Deletion",
                buttons: {
                    default: {
                        label:     " Cancel ",
                        className: "btn-default",
                        callback:  function( ) {
                            // Do nothing
                        }
                    },
                    danger: {
                        label:     " Yes ",
                        className: "btn-danger",
                        callback:  function( ) {
                            self.model.collection.remove( self.model );
                        }
                    }
                }
            } );
        },

        fieldValidation: function( field, regexp ) {

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

        render: function( ) {

            var self = this;

            self.$el.html( self.template( {
                model: self.model
            } ) );
            
            return self;
        }

    } );

    return EmployeeView;
} );

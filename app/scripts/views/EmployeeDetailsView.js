/*global define*/

define( [
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function( $, _, Backbone, JST ) {
    'use strict';

    var EmployeeDetailsView = Backbone.View.extend( {

        template	: JST[ 'app/scripts/templates/employee-details.ejs' ],
        className	: 'employee-details',
		errorFields : [ ],
		events      : {
            'submit form#edit-form': 'updateEmployee'
		},

		updateEmployee : function( e ) {

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
                        $( '#edit-modal' ).modal( 'hide' );
                        $( 'input, button, option, textarea' ).prop( 'disabled', false );
                        $( '.btns' ).removeClass( 'loading' );
                        self.render( );
                    },
                    error: function( res, err ) {
                        if ( JSON.stringify( err ) && JSON.stringify( err ).match( /email/ ) ) {
							$( 'input, button, option' ).prop( 'disabled', false );
							$( '.btns' ).removeClass( 'loading' );
							$( form[ 'email' ] ).parent( ).addClass( 'has-error error' );
						}
                    }
                } );

            } else {
                self.errorFields = [ ];
            }

        },

        fieldValidation : function( field, regexp ) {

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

        render : function( ) {

            var self = this;

            self.$el.html( self.template( {
                model : self.model
            } ) );

            return self;
        }

    } );

    return EmployeeDetailsView;
} );
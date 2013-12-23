define( [
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ( $, _, Backbone, JST ) {
    'use strict';

    var AppView = Backbone.View.extend( {

        el                     : $( '#app' ),
        subViews               : {},
        template               : JST[ 'app/scripts/templates/app.ejs' ],
        loginTemplate          : JST[ 'app/scripts/templates/login-form.ejs' ],
        forgotPasswordTemplate : JST[ 'app/scripts/templates/forgot-password.ejs' ],
        mainTemplate           : JST[ 'app/scripts/templates/app-main.ejs' ],
        errorFields            : [ ],

        initialize: function ( ) {

            var self = this;
            self.listenTo( self.model, 'change:user', self.render );
            self.listenTo( self.model, 'change:currentContent', self.renderCurrentContent );
            self.render( );

        },

        events: {
            'submit form.login-form'      : 'doLogin',
            'click a.logout'              : 'doLogOut',
            'click .forgot-password'      : 'forgotPassword',
            'submit form.change-password' : 'changePassword'
        },
        changePassword: function ( e ) {
            e.preventDefault( );

            var self    = this;
            var form    = e.currentTarget;
            var data    = {};

            var oldPassword = self.passwordValidation( form.old_password, form.new_password, '' );

            if ( oldPassword.length > 0 ) {

                var newPassword = self.passwordValidation( form.new_password, form.con_password, 'compare' );

                if ( newPassword.length > 5 ) {
					data.oldPassword = oldPassword;
					data.password    = newPassword;
					data._id         = self.model.get( 'user' )._id;
					data.email       = self.model.get( 'user' ).email;
					return self.updatePassword( data, self, form, e );
                } else {
					if( newPassword.length > 0 ) {
						$( '.alert.alert-danger' ).children()[0].innerHTML = 'Password should atleast 6 characters.';
					} else {
						$( '.alert.alert-danger' ).children()[0].innerHTML = 'Password is not confirm!';
					}

					$(".alert.alert-danger").removeClass( 'hidden' ).fadeToggle(4000, function () {
						$(".alert.alert-danger").addClass( 'hidden' );
						$(".alert.alert-danger").css({ display: "block" });
					});
				}
            } else {
				$( '.alert.alert-danger' ).children()[0].innerHTML = 'Password does not change!';

				$(".alert.alert-danger").removeClass( 'hidden' ).fadeToggle(4000, function () {
					$(".alert.alert-danger").addClass( 'hidden' );
					$(".alert.alert-danger").css({ display: "block" });
				});
			}
        },
        updatePassword: function ( data, self, form, evt) {
			var bootbox = window.bootbox;
			var urlRoot = self.model.get( 'dbURL' ) + "/reset-password";

			$( 'input, button' ).prop( 'disabled', true );
			$( '.btns' ).addClass( 'loading' );

			$.ajax( {
				'type'  : "POST",
				'url'   : urlRoot,
				'data'  : data
			} )
			.complete( function ( data ) {
				var result = JSON.parse( data.responseText );

				if( result.error && (result.error_message).match( /password does not exist/ ) ) {

					$( '.alert.alert-danger' ).children()[0].innerHTML = result.error_message;

					$(".alert.alert-danger").removeClass( 'hidden' ).fadeToggle(4000, function () {
						$(".alert.alert-danger").addClass( 'hidden' );
						$(".alert.alert-danger").css({ display: "block" });
					});

					$( 'input, button' ).prop( 'disabled', false );
					$( '.btns' ).removeClass( 'error loading' );

				} else {
					$( 'input, button' ).prop( 'disabled', false );
					$( '.btns' ).removeClass( 'error loading' );
					$('li.dropdown').removeClass('open');
					return self.doLogOut( evt );
				}
			});

        },

        render: function ( ) {

            var self = this;

            self.$el.html( self.template( {
                model: self.model
            } ) );

            self.model.set( 'containerDiv', self.$el.find( '.main > .container' )[ 0 ] );

            if ( self.model.get( 'user' ) ) {
                $( self.model.get( 'containerDiv' ) ).html( self.mainTemplate( {
                    model: self.model
                } ) );

                self.model.set( 'contentSectionDiv', $( self.model.get( 'containerDiv' ) ).find( '.content-section' )[ 0 ] );

                window.App.router.navigate( self.model.get( 'baseUrl' ), {
                    trigger: true
                } );

            } else {

                $( self.model.get( 'containerDiv' ) ).html( self.loginTemplate( ) );

            }

            return self;

        },

        renderCurrentContent: function ( ) {

            var self              = this;
            var currentContent    = self.model.get( 'currentContent' );
            var contentSectionDiv = self.model.get( 'contentSectionDiv' );

            currentContent.delegateEvents( );

            $( contentSectionDiv )
                .hide( )
                .empty( )
                .html( currentContent.render( ).el ).fadeIn( "slow" );

            self.handleMainNav( );

        },

        handleMainNav: function ( ) {

            $( '.main-nav > li.active' ).removeClass( 'active' );
            $( '.modal-backdrop' ).remove( );
            $( '.datepicker' ).remove( );

            var pathName = Backbone.history.location.pathname;

            if ( pathName.match( /^\/assets/ ) ) {
                return $( '.main-nav > li.assets' ).addClass( 'active' );
            }

            if ( pathName.match( /^\/employees/ ) ) {
                return $( '.main-nav > li.employees' ).addClass( 'active' );
            }

            if ( pathName.match( /^\/inventory-reports/ ) ) {
                return $( '.main-nav > li.reports' ).addClass( 'active' );
            }

        },

        forgotPassword: function ( e ) {
            var self = this;
            $( self.model.get( 'containerDiv' ) ).html( self.forgotPasswordTemplate( ) );

            $( '.forgot-form' ).submit( self.requestForgotPassword.bind( self ) );
            $( '.btn-back' ).click( self.render.bind( self ) );
        },

        requestForgotPassword: function ( e ) {
            e.preventDefault( );

            var self       = this;
            var form       = e.currentTarget;
            var bootbox    = window.bootbox;
            var emailField = form.email;

            var urlRoot = emailField.value.length > 0 ? self.model.get( 'dbURL' ) + "/reset-password" : '';
            $( 'input, button, option, textarea' ).prop( 'disabled', true );
            $( '.btns' ).addClass( 'loading' );

            if ( urlRoot.length > 0 ) {

                $.ajax( {
                    'type': "POST",
                    'url': urlRoot,
                    'data': {
                        'email': emailField.value
                    }
                } )
                    .complete( function ( data ) {
                        var result = JSON.parse( data.responseText );
                        if ( result.error ) {
                            bootbox.dialog( {
                                message : 'Sorry, email not found!',
                                title   : "Forgot Password Error",
                                buttons : {
                                    default : {
                                        label     : " OK",
                                        className : "btn-default",
                                        callback  : function ( ) {
                                            $( 'input, button, option' ).prop( 'disabled', false );
                                            $( '.btns' ).removeClass( 'error loading' );
                                            $( form[ 'email' ] ).parent( ).addClass( 'has-error error' );
                                        }
                                    }
                                }
                            } );
                        } else {
                            bootbox.dialog( {
                                message : 'Your password has been reset. Please check your email.',
                                title   : "Forgot Password Successful",
                                buttons : {
                                    default: {
                                        label     : " OK",
                                        className : "btn-default",
                                        callback  : function ( ) {
                                            self.render( );
                                            $( 'input, button, option, textarea' ).prop( 'disabled', false );
                                            $( '.btns' ).removeClass( 'loading' );
                                        }
                                    }
                                }
                            } );
                        }
                    } );

            } else {
                bootbox.dialog( {
                    message : 'Sorry but I need your email to reset your password.',
                    title   : "Forgot Password Error",
                    buttons : {
                        default: {
                            label     : " OK",
                            className : "btn-default",
                            callback  : function ( ) {
                                $( 'input, button, option' ).prop( 'disabled', false );
                                $( '.btns' ).removeClass( 'error loading' );
                                $( form[ 'email' ] ).parent( ).addClass( 'has-error error' );
                            }
                        }
                    }
                } );
            }
        },

        doLogin: function ( e ) {

            e.preventDefault( );

            var self = this;
            var form = e.currentTarget;
            var emailField = form.email;
            var passwordField = form.password;

            if ( !emailField.value.trim( ).match( /^[a-z0-9._%\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/ ) ) {

                $( emailField ).parent( ).addClass( 'has-error' );
                return emailField.focus( );

            }

            $( emailField ).parent( ).removeClass( 'has-error' ).blur( );

            if ( passwordField.value.trim( ).length < 6 ) {

                $( passwordField ).parent( ).addClass( 'has-error' );
                return passwordField.focus( );

            }

            $( passwordField ).parent( ).removeClass( 'has-error' ).blur( );

            $( 'input, button' ).prop( 'disabled', true );
            $( '.btns' ).addClass( 'loading' );
            $( '.alert.alert-danger' ).addClass( 'hidden' );



            $.post( 'http://gzais-api.herokuapp.com/user-login', {

                email: emailField.value,
                password: passwordField.value

            } ).done( function ( result ) {

				/**
				* NOTE:
				* "access_token" should be set first before the "user" attribute
				* this will fix the issue on the asset not listing when you first logged in to the system
				**/
                self.model.set( 'access_token', result.access_token );

                /*
                * This mother f'n thing should trigger a change event on the View
                * causing the view to re-route to /assets page.
                **/
                self.model.set( 'user', result.employee );

                /**
                * Now let's stringify them JSON result and store in localStorage
                **/
                window.localStorage.setItem( 'app-data', JSON.stringify( result ) );

            } ).fail( function( err ) {

				$( '.alert.alert-danger' ).removeClass( 'hidden' );

            } ).always( function( ) {

				$( 'input, button' ).prop( 'disabled', false );
				$( '.btns' ).removeClass( 'loading' );

            } );

        },

        doLogOut: function ( e ) {

            e.preventDefault( );

            if ( this.model.get( 'user' ) ) {

                this.model.set( 'user', null );
                this.model.set( 'access_token', null );

                window.localStorage.removeItem( 'app-data' );
                window.App.router.navigate( '/', {
                    trigger: true
                } );

            }

        },

        passwordValidation: function ( oldPassword, newPassword, type ) {

            $( oldPassword ).removeClass( 'error' );

            if(newPassword.value.length < 6) {
				this.errorFields.pop( newPassword.id );
				this.errorFields.push( newPassword.id );
				$( newPassword ).parent( ).addClass( 'has-error' );
				return newPassword.value;
            }

            if ( oldPassword.value === newPassword.value ) {
                if ( type === 'compare' ) {
                    $( oldPassword ).parent( ).removeClass( 'has-error' );
                    return oldPassword.value;
                } else {
                    this.errorFields.pop( oldPassword.id );
                    this.errorFields.push( oldPassword.id );
                    $( oldPassword ).parent( ).addClass( 'has-error' );
                    $( newPassword ).parent( ).addClass( 'has-error' );
                    return 0;
                }
            } else {
                if ( type === 'compare' ) {
                    this.errorFields.pop( oldPassword.id );
                    this.errorFields.push( oldPassword.id );
                    $( oldPassword ).parent( ).addClass( 'has-error' );
                    return 0;
                } else {
                    $( oldPassword ).parent( ).removeClass( 'has-error' );
                    return oldPassword.value;
                }
            }

        }

    } );

    return AppView;
} );

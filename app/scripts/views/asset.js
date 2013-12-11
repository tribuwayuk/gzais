/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function($, _, Backbone, JST) {
    'use strict';

    var AssetView = Backbone.View.extend({

        className: 'asset-entry',

        tagName: 'tr',

        errorFields: [],

        template: JST['app/scripts/templates/asset.ejs'],
        editTemplate: JST['app/scripts/templates/asset-edit.ejs'],

        events: {
            'click .delete-asset': 'deleteAsset',
            'click .edit-asset': 'displayEditForm'
        },

        initialize: function() {

            var self = this;
            // Proper way to handle deletion through events
            self.listenTo(self.model, 'remove', function(index) {
                var options = options || {};
                options.url = self.model.url();

                options.success = function() {
                    return self.remove();
                };
                options.error = function() {
                    console.error('error');
                };

                self.model.collection.sync('delete', self.model, options);
            });
        },

        displayEditForm: function(e) {

            e.preventDefault();

            console.log(e);

            var self = this;
            $('#edit-modal').empty();
            $('#edit-modal').append(self.editTemplate({
                model: this.model
            }));
            // now let's bind to form's submit event
            $('#edit-form').submit(function(e) {
                e.preventDefault();

                var asset_name = self.fieldValidation(e.currentTarget.asset_name, /^[a-zA-Z0-9\.\-\,\'\s]{2,15}$/g);
                var asset_type = self.fieldValidation(e.currentTarget.asset_type, /^[a-zA-Z0-9\.\-\,\'\s]{2,15}$/);
                var asset_description = e.currentTarget.asset_description.value;
                var date_purchased = e.currentTarget.date_purchased.value;
                var status = e.currentTarget.status.value;
                var serial_number = self.fieldValidation(e.currentTarget.serial_number, /^[a-zA-Z0-9\.\-\,\'\s]{2,15}$/);
                var supplier = self.fieldValidation(e.currentTarget.supplier, /^[a-zA-Z0-9\.\-\,\'\s]{2,15}$/);
                var reason = e.currentTarget.reason.value;

                self.model.set('asset_name', asset_name);
                self.model.set('asset_type', asset_type);
                self.model.set('asset_description', asset_description);
                self.model.set('date_purchased', date_purchased);
                self.model.set('status', status);
                self.model.set('serial_number', serial_number);
                self.model.set('supplier', supplier);
                self.model.set('reason', reason);

                if (self.errorFields.length === 0) {
                    self.model.save({
                        asset_name: asset_name,
                        asset_type: asset_type,
                        asset_description: asset_description,
                        date_purchased: date_purchased,
                        status: status,
                        serial_number: serial_number,
                        supplier: supplier,
                        reason: reason
                    }, {
                        success: function(model) {
                            self.render();
                            $('#edit-modal').modal('hide');
                        },
                        error: function(model, xhr, options) {
                            console.log(xhr.status);
                            $('#edit-modal').modal('hide');
                        }
                    });
                } else {
                    self.errorFields = [];
                }

            });
        },

        deleteAsset: function() {
            var self = this,
                bootbox = window.bootbox;

            bootbox.dialog({
                message: 'Are you sure you want to delete ' + self.model.get('asset_name') + ' ?',
                title: "Confirm Deletion",
                buttons: {
                    default: {
                        label: " Cancel ",
                        className: "btn-default",
                        callback: function() {
                            // Do nothing
                        }
                    },
                    danger: {
                        label: " Yes ",
                        className: "btn-danger",
                        callback: function() {
                            // delete model.
                            return self.model.collection.remove(self.model);
                        }
                    }
                }
            });
        },

        render: function() {
            var self = this;
            self.$el.html(self.template({
                model: self.model
            }));
            return self;
        },

        fieldValidation: function(field, regexp) {
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

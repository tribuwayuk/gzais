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
            var self = this;
            $('#edit-modal').empty();
            $('#edit-modal').append(self.editTemplate({
                model: this.model
            }));
            // now let's bind to form's submit event
            $('#edit-form').submit(function (e) {
                e.preventDefault();
                var form = e.currentTarget,
                    editAsset = self.model;

                editAsset.asset_name = self.fieldValidation(form.asset_name, /^[a-zA-Z0-9\.\-\,\''\s]{2,15}$/);
                editAsset.asset_type = self.fieldValidation(form.asset_type, /^[a-zA-Z0-9\s]{2,15}$/);
                editAsset.date_purchased = self.fieldValidation(form.date_purchased, /^\d{2}\/\d{2}\/\d{4}$/);
                editAsset.status = self.fieldValidation(form.status, /^(working|defective)$/);
                editAsset.serial_number = self.fieldValidation(form.serial_number, /^[a-zA-Z0-9-\s]{5,20}$/);
                editAsset.supplier = self.fieldValidation(form.supplier, /^[a-zA-Z0-9\s]{3,20}$/);
                editAsset.reason = self.fieldValidation(form.reason, /^.{5,50}$/);
                editAsset.asset_description = self.fieldValidation(form.asset_description, /^.{5,160}$/);

                if (self.errorFields.length === 0) {
                    self.updateAsset(editAsset);
                } else {
                    self.errorFields = [];
                }
            });
        },

        updateAsset: function(asset){
            var self = this,
                id   = self.model.get('_id');

            asset.unset('_id');

            asset.save({_id:id},{
              url: self.model.url() + '/' + id,
              method: 'put',
              wait: true,
              success: function (){
                $('#edit-modal').modal('hide');
              }
            });
        },

        // saveChanges: function(e) {
        //     e.preventDefault();
        // },

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
        }

    });

    return AssetView;
});

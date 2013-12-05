/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'AssetView'
], function($, _, Backbone, JST, AssetView) {

  'use strict';

  var AssetsView = Backbone.View.extend({

    template: JST['app/scripts/templates/assets.ejs'],

    events: {
      'submit form#add-form': 'newAsset',
      'submit form#edit-form': 'editAsset',
      'click btn-add': 'newAsset'
    },

    errorFields: [],

    render: function() {
      var self = this;
      self.$el.html(self.template({}));
      return self;
    },

    initialize: function() {
      var self = this;
      self.listenTo(self.collection, 'add', self.onAdd);
      self.collection.fetch();
    },

    newAsset: function(e) {

      e.preventDefault();

      var self = this,
        form = e.currentTarget,
        newAsset = {};


      newAsset.asset_name = self.fieldValidation(form.asset_name, /^[a-zA-Z0-9\.\-\s]{2,15}$/);
      newAsset.asset_type = self.fieldValidation(form.asset_type, /^[a-zA-Z0-9\s]{2,15}$/);
      newAsset.date_purchased = self.fieldValidation(form.date_purchased, /^[0-9]+\/+[0-9]+\/+[0-9]{4,}$/);
      newAsset.status = self.fieldValidation(form.status, /^(working|defective)$/);
      newAsset.serial_number = self.fieldValidation(form.serial_number, /^[a-zA-Z0-9-\s]{5,20}$/);
      newAsset.supplier = self.fieldValidation(form.supplier, /^[a-zA-Z0-9\s]{3,20}$/);
      newAsset.reason = self.fieldValidation(form.reason, /^[a-zA-Z0-9\s]{5,50}$/);
      newAsset.asset_description = self.fieldValidation(form.asset_description, /^[a-zA-Z0-9\s]{5,160}$/);

      if (self.errorFields.length === 0) {
        self.ajaxRequest(form, newAsset);
      } else {
        self.errorFields = [];
      }

    },

    ajaxRequest: function(form, data) {
      var self = this;
      $.post(self.collection.url, data).done(function(result) {
        if (!result.errors) {
          self.collection.add(result);
          form.reset();
          $('#add-modal').modal('hide');
        }
      });
    },

    editAsset: function(e) {
      e.preventDefault();
      var self = this,
        form = e.currentTarget,
        editAsset = {};

      editAsset.asset_name = form.asset_name.value;
      editAsset.asset_type = form.asset_type.value;
      editAsset.date_purchased = form.date_purchased.value;
      editAsset.status = form.status.value;
      editAsset.serial_number = form.serial_number.value;
      editAsset.supplier = form.supplier.value;
      editAsset.reason = form.reason.value;
      editAsset.asset_description = form.asset_description.value;
      // to do: implement update collection.

    },

    onAdd: function(model) {
      var self = this;
      var asset = new AssetView({
        model: model
      });
      $('tbody.assets-list').prepend(asset.render().el);
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

  return AssetsView;
});

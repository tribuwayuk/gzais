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
      'submit form': 'newAsset',
      'submit form#editForm': 'editAsset',
      'click btn-add': 'newAsset',
      'click .btn-default': 'reset',
    },

    errorFields: [],

    newAsset: function(e) {

      e.preventDefault();

      var self = this,
        form = e.currentTarget,
        newAsset = {};


      newAsset.asset_name = self.fieldValidation(form.asset_name, /^.{2,}$/);
      newAsset.asset_type = self.fieldValidation(form.asset_type, /^.{2,}$/);
      newAsset.date_purchased = self.fieldValidation(form.date_purchased, /^.{2,}$/);
      newAsset.status = self.fieldValidation(form.status, /^(working|defective)$/);
      newAsset.serial_number = self.fieldValidation(form.serial_number, /^.{5,}$/);
      newAsset.supplier = self.fieldValidation(form.supplier, /^.{2,}$/);
      newAsset.reason = form.reason.value;
      newAsset.asset_description = self.fieldValidation(form.asset_description, /^.{2,}$/);

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

    onAdd: function(model) {
      var self = this;
      var asset = new AssetView({
        model: model
      });
      $('tbody.assets-list').prepend(asset.render().el);
    },

    reset: function(){
      var self = this;
      
      self.render();
      self.collection.fetch();
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

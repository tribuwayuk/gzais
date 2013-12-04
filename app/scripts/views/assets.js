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
      'click btn-add': 'newAsset'
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
        self.collection.add(newAsset);
        form.reset();
        $('#add-modal').modal('hide');
      } else {
        self.errorFields = [];
      }

    },

    editAsset: function(e) {
      e.preventDefault();
      var self = this,
        form = e.currentTarget,
        editAsset = {};

      editAsset.first_name = form.first_name.value;
      editAsset.middle_name = form.middle_name.value;
      editAsset.last_name = form.last_name.value;
      editAsset.email = form.email.value;
      editAsset.gender = form.gender.value;
      editAsset.date_of_birth = form.date_of_birth.value;
      editAsset.date_employed = form.date_employed.value;
      editAsset.user_role = form.user_role.value;


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

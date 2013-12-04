/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function($, _, Backbone, JST) {
  'use strict';

  var AssetView = Backbone.View.extend({
    name_num_chars: 30,
    desc_num_chars: 160,
    type_num_chars: 30,
    serial_num_chars: 30,
    supplier_num_chars: 160,
    reason_num_chars: 160,

    template: JST['app/scripts/templates/asset.ejs'],

    events: {
      'click .btn-add': function() {
        alert('aaaa');
      }
    },

    saveAsset: function(e) {
      e.preventDefault();
      console.log('Asset Saved!');
    },

    validateNameChars: function(str) {
      if (str.length > this.name_num_chars)
        return false;
      else
        return true;
    },

    validateDescriptionChars: function(str) {
      if (str.length > this.desc_num_chars)
        return false;
      else
        return true;
    },

    validateTypeChars: function(str) {
      if (str.length > this.type_num_chars)
        return false;
      else
        return true;
    },

    validateSerialChars: function(str) {
      if (str.length > this.serial_num_chars)
        return false;
      else
        return true;
    },

    validateSupplierChars: function(str) {
      if (str.length > this.supplier_num_chars)
        return false;
      else
        return true;
    },

    validateReasonChars: function(str) {
      if (str.length > this.reason_num_chars)
        return false;
      else
        return true;
    }

  });

  return AssetView;
});

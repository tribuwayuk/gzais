/*global define*/
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var AssetModel = Backbone.Model.extend({

    defaults: {},

    idAttribute: '_id',

    getDatePurchased: function() {

      var date   = new Date(this.get('date_purchased')),
          _month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1: '' + date.getMonth() + 1,
          _date  = (date.getDate() + 1 < 10) ? '0' + date.getDate() + 1: '' + date.getDate() + 1,
          _year  = date.getFullYear();

      return _month + '/' + _date + '/' + _year;

    }

  });

  return AssetModel;
});

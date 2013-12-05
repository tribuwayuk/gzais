/*global define*/
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  var AssetModel = Backbone.Model.extend({

    defaults: {},

    getDatePurchased: function() {

      var date   = new Date(this.get('date_purchased')),
          _month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() : '' + date.getMonth(),
          _date  = (date.getDate() + 1 < 10) ? '0' + date.getDate() : '' + date.getDate(),
          _year  = date.getFullYear();

      return _month + '/' + _date + '/' + _year;

    }

  });

  return AssetModel;
});

/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function($, _, Backbone, JST) {
    'use strict';

    var AssetsView = Backbone.View.extend({
	name_num_chars: 30,
	desc_num_chars: 160,
	type_num_chars: 30,
	serial_num_chars: 30,
	supplier_num_chars: 160,
	reason_num_chars: 160,

	template: JST['app/scripts/templates/assets.ejs'],
	templateModel: JST['app/scripts/templates/asset.ejs'],

	events: {
	    'focusout #name': 'focusOutName',
	    'focusout #description': 'focusOutDescription',
	    'focusout #type': 'focusOutType',
	    'focusout #serial-number': 'focusOutSerial',
	    'focusout #supplier': 'focusOutSupplier',
	    'focusout #purchase-reason': 'focusOutReason',
	    'submit form': 'newAsset'
	},

	enableSaveButton: function() {
	    $('#save_asset').attr("disabled", false);
	},

	disableSaveButton: function() {
	    $('#save_asset').attr("disabled", true);
	},

	validForm: function(formid) {
	    $(formid).removeClass('mali');
	    this.enableSaveButton();
	},

	invalidForm: function(formid) {
	    $(formid).addClass('mali');
	    this.disableSaveButton();
	},

	focusOutName: function(e) {
	    var formid = '#name';
	    var asset_name = $(formid).val();
	    if (!this.validateNameChars(asset_name)) {
		this.invalidForm(formid);
	    } else {
		this.validForm(formid);
	    }
	},

	focusOutDescription: function(e) {
	    var formid = '#description';
	    var asset_description = $(formid).val();
	    if (!this.validateNameChars(asset_description)) {
		this.invalidForm(formid);
	    } else {
		this.validForm(formid);
	    }
	},

	focusOutType: function(e) {
	    var formid = '#type';
	    var asset_type = $(formid).val();
	    if (!this.validateNameChars(asset_type)) {
		this.invalidForm(formid);
	    } else {
		this.validForm(formid);
	    }
	},

	focusOutSerial: function(e) {
	    var formid = '#serial-number';
	    var asset_serial_number = $(formid).val();
	    if (!this.validateNameChars(asset_serial_number)) {
		this.invalidForm(formid);
	    } else {
		this.validForm(formid);
	    }
	},

	focusOutSupplier: function(e) {
	    var formid = '#supplier';
	    var asset_supplier = $(formid).val();
	    if (!this.validateNameChars(asset_supplier)) {
		this.invalidForm(formid);
	    } else {
		this.validForm(formid);
	    }
	},

	focusOutReason: function(e) {
	    var formid = '#purchase-reason';
	    var asset_reason = $(formid).val();
	    if (!this.validateNameChars(asset_reason)) {
		this.invalidForm(formid);
	    } else {
		this.validForm(formid);
	    }
	},

	clearForm: function() {
	    $('#name').val('');
	    $('#description').val('');
	    $('#type').val('');
	    $('#date-purchased').val('');
	    $('#status').val('');
	    $('#serial-number').val('');
	    $('#supplier').val('');
	    $('#purchase-reason').val('');
	},

	newAsset: function(e) {
	    e.preventDefault();

	    // TODO: handle form submission
	    var asset_name = $('#name').val();
	    var asset_description = $('#description').val();
	    var asset_type = $('#type').val();
	    var asset_date_purchased = $('#date-purchased').val();
	    var asset_status = $('#status').val();
	    var asset_serial_number = $('#serial-number').val();
	    var asset_supplier = $('#supplier').val();
	    var asset_purchase_reason = $('#purchase-reason').val();

	    var push_values = {
		itemName: asset_name,
		itemAsignee: '',
		itemType: asset_type,
		itemSerialNumber: asset_serial_number,
		itemDatePurchased: asset_date_purchased,
		itemSupplier: asset_supplier,
		itemStatus: asset_status
	    };

	    $('#asset_list tr:first').after(this.templateModel(push_values));
	    this.clearForm();
	},

	render: function() {
	    var self = this;
	    self.$el.html(self.template());
	    return self;
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

    return AssetsView;
});

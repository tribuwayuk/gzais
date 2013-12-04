/*global define*/
define([
    'underscore',
    'backbone',
    'AssetView',
    'AssetModel'
], function(_, Backbone, AssetView, AssetModel) {
    'use strict';

    describe('AssetView', function() {

	describe('Asset Field Validation', function() {
	    it('AssetView Should be a subclass of Backbone.View', function() {
		AssetView.prototype.should.be.an.instanceof(Backbone.View);
	    });

	    it('Asset Name should be less than 30 characters', function() {
		var app = new AssetView;
		var name = 'Samsung Galaxy S2';
		app.validateNameChars(name).should.be.equal(true);
	    });

	    it('Asset Description should be less than 160 characters', function() {
		var app = new AssetView;
		var description = 'This is a description';
		app.validateDescriptionChars(description).should.be.equal(true);
	    });

	    it('Asset Type should be less than 30 characters', function() {
		var app = new AssetView;
		var type = 'Smartphone';
		app.validateTypeChars(type).should.be.equal(true);
	    });

	    it('Asset Serial should be less than 30 characters', function() {
		var app = new AssetView;
		var serial_number = '20130101';
		app.validateSerialChars(serial_number).should.be.equal(true);
	    });

	    it('Asset Supplier should be less than 160 characters', function() {
		var app = new AssetView;
		var supplier = 'Samsung Philippines';
		app.validateSupplierChars(supplier).should.be.equal(true);
	    });

	    it('Asset Reason should be less than 160 characters', function() {
		var app = new AssetView;
		var reason = 'This is so cool';
		app.validateReasonChars(reason).should.be.equal(true);
	    });
	});

    });

});

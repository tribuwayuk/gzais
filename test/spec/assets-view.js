/*global define*/
define([
    'underscore',
    'backbone',
    'AssetsView',
    'AssetsModel'
], function(_, Backbone, AssetsView, AssetsModel) {
    'use strict';

    describe('AssetsView', function() {

	describe('Assets Field Validation', function() {
	    it('AssetsView Should be a subclass of Backbone.View', function() {
		AssetsView.prototype.should.be.an.instanceof(Backbone.View);
	    });

	    it('Asset Name should be less than 30 characters', function() {
		var app = new AssetsView;
		var name = 'Samsung Galaxy S2';
		app.validateNameChars(name).should.be.equal(true);
	    });

	    it('Asset Description should be less than 160 characters', function() {
		var app = new AssetsView;
		var description = 'This is a description';
		app.validateDescriptionChars(description).should.be.equal(true);
	    });

	    it('Asset Type should be less than 30 characters', function() {
		var app = new AssetsView;
		var type = 'Smartphone';
		app.validateTypeChars(type).should.be.equal(true);
	    });

	    it('Asset Serial should be less than 30 characters', function() {
		var app = new AssetsView;
		var serial_number = '20130101';
		app.validateSerialChars(serial_number).should.be.equal(true);
	    });

	    it('Asset Supplier should be less than 160 characters', function() {
		var app = new AssetsView;
		var supplier = 'Samsung Philippines';
		app.validateSupplierChars(supplier).should.be.equal(true);
	    });

	    it('Asset Reason should be less than 160 characters', function() {
		var app = new AssetsView;
		var reason = 'This is so cool';
		app.validateReasonChars(reason).should.be.equal(true);
	    });
	});

    });

});

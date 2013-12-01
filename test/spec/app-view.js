/*global define*/
define([
  'underscore',
  'backbone',
  'AppView'
], function(_, Backbone, AppView) {
  'use strict';

  describe('AppView', function() {

    var _el, _appView, _appViewContent;
    
    // Create DIV element for the AppView instance
    _el = document.createElement('div');
    _el.setAttribute('id','app');

    // Init AppView
    _appView = new AppView({
      el: _el,
    });

    it('should be a subclass of Backbone.View', function() {

      AppView.prototype.should.be.an.instanceof(Backbone.View);

    });

    describe('#initialize', function() {

      it('should have an "el" property which is an HTMLDivElement', function() {
        
        _appView.should.have.property('el');
        _appView.el.should.be.an.instanceof(HTMLDivElement);

      });

      it('should have an "$el" property which is a jQuery object', function() {
      
        _appView.should.have.property('$el');
        _appView.$el.should.be.an.instanceof(jQuery);

      });

    });

    describe('#render', function() {

      it('should be a function', function() {

        _appView.should.have.property('render').and.a('function');

      });

      it('should return a DIV element with an ID named "app"', function() {

        var _el = _appView.render().el;
        _el.nodeName.should.equal('DIV');
        _el.id.should.equal('app');

      });

      it('should render the EJS template with a given title', function() {
        _appView.render({title:'render EJS'})
        .$el.find('.main-title')[0]
        .innerText.should.equal('render EJS');
      });

    });

    describe('#template', function() {

      it('should be a function', function() {

        _appView.should.have.property('template').and.a('function');

      });

      it('should return stringified DIV element with an "Asset Inventory System" heading title', function() {

        var _temp = _appView.template({title:'Asset Inventory System'});
        _temp.should.be.a('string');
        _temp.match(/Asset Inventory System/)['index'].should.be.above(-1);
        
      });

    });

  });

});
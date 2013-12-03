/*global define*/
define([
  'underscore',
  'backbone',
  'AppView',
  'AppModel'
], function(_, Backbone, AppView, AppModel) {
  'use strict';

  describe('AppView', function() {

    it('should be a subclass of Backbone.View', function() {
      AppView.prototype.should.be.an.instanceof(Backbone.View);
    });

    describe('#initialize', function() {

      var appView = new AppView({model: new AppModel(), el: document.createElement('div')});

      it('should return an instance of AppView', function() {
        appView.should.be.an.instanceof(AppView);
      });

      it('should render the default view', function() {
        appView.el.querySelector('.header').should.be.ok;
        appView.el.querySelector('.main').should.be.ok;
        appView.el.querySelector('.footer').should.be.ok;
      });

    });

    describe('#template', function() {

      it('should be a function', function() {
        AppView.prototype.template.should.be.a('function');
      });

      it('should return a string of the html template', function() {
        
        var appView = new AppView({model: new AppModel()});
        var tmpl = appView.template({model: appView.model});

        tmpl.should.be.a('string');
        tmpl.match(/Global Zeal AIS/)['index'].should.be.above(-1);

      });

    });

    describe('asd', function() {

    });

  });

});

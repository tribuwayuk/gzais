
'use strict';
require.config({
  paths: {
    'jquery': '../app/bower_components/jquery/jquery',
    'underscore': '../app/bower_components/underscore/underscore',
    'backbone': '../app/bower_components/backbone/backbone',
    'mocha': 'lib/mocha/mocha',
    'chai': 'lib/chai',
    'templates': '../app/.tmp/scripts/templates',
    'AppView': '../app/scripts/views/app'
  },
  shim: {
    'chai': {
      exports: 'chai'
    },
    'mocha': {
      exports: 'mocha'
    },
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

require([
  'require',
  'chai',
  'mocha',
  'backbone'
], function(require, chai, mocha) {

  chai.should();

  var _mocha = window.mochaPhantomJS ? window.mochaPhantomJS : mocha;
  _mocha.setup('bdd');

  require([
    'spec/app-view',
    'spec/app-collection'
  ], function(require) {

    console.log(window.mochaPhantomJS);
    _mocha.run();

  });

});

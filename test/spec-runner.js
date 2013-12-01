'use strict';
require.config({
  paths: {
    'jquery': '/bower_components/jquery/jquery',
    'underscore': '/bower_components/underscore/underscore',
    'backbone': '/bower_components/backbone/backbone',
    'mocha': 'lib/mocha/mocha',
    'chai': 'lib/chai',
    'templates': '/scripts/templates',
    'User': '/scripts/models/user',
    'AppView': '/scripts/views/app'
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

  var _mocha = window.mochaPhantomJS ? window.mochaPhantomJS : mocha;
  _mocha.setup('bdd');

  require([
    'spec/app-view.js',
  ], function(require) {

    _mocha.run();

  });

});

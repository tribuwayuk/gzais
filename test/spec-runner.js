'use strict';
require.config({
  paths: {
    'jquery': 'bower_components/jquery/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'mocha': 'lib/mocha/mocha',
    'chai': 'lib/chai',
    'templates': '/scripts/templates',
    'AssetsModel': '/scripts/models/assets',
    'AssetsView': '/scripts/views/assets',
    'AssetModel': '/scripts/models/asset',
    'AssetView': '/scripts/views/asset',
    'AppModel': '/scripts/models/app',
    'AppView': '/scripts/views/app',
    'EmployeeModel': '/scripts/models/employee'
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

  mocha.setup('bdd');

  require([
    'spec/employee-model',
    'spec/app-view',
    'spec/asset-view',
    'spec/assets-view'
  ], function(require) {

    mocha.run();

  });

});

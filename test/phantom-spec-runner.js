'use strict';
require.config({
  paths: {
    'jquery': '../app/bower_components/jquery/jquery',
    'underscore': '../app/bower_components/underscore/underscore',
    'backbone': '../app/bower_components/backbone/backbone',
    'mocha': 'lib/mocha/mocha',
    'chai': 'lib/chai',
    'templates': '../.tmp/scripts/templates',
    'AppView': '../app/scripts/views/app',
    'AppModel': '../app/scripts/models/app',
    'EmployeeModel': '../app/scripts/models/employee'
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
    'spec/app-view',
    'spec/app-model',
    'spec/employee-model'
  ], function(require) {

    window.mochaPhantomJS.run();

  });

});

'use strict';
require.config({
    paths: {
        'jquery': '/bower_components/jquery/jquery',
        'underscore': '/bower_components/underscore/underscore',
        'backbone': '/bower_components/backbone/backbone',
        'mocha': 'lib/mocha/mocha',
        'chai': 'lib/chai',
        'User': '/scripts/models/user'
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

    // Chai
    var should = chai.should();

    /*globals mocha */
    mocha.setup('bdd');

    require([
        'spec/test.js',
    ], function(require) {
        mocha.run();
    });

});

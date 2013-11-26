'use strict';
require.config({
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'backbone': '../bower_components/backbone/backbone',
        'underscore': '../bower_components/underscore/underscore',
        'mocha': 'lib/mocha/mocha',
        'chai': 'lib/chai'
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

require(['require', 'chai', 'mocha', 'jquery'], function(require, chai) {

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

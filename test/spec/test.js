/*global define*/
define([
    'underscore',
    'backbone',
    'User'
], function(_, Backbone, User) {
    'use strict';

    describe('User', function() {
        describe('initialization', function() {
            it('should create a new instance of User without passing any parameter', function() {
                (new User()).should.be.an.instanceof(User).and.have.property('cid');
            });
            it('should create a new instance of User with a given parameter', function() {
                (new User({
                    name: 'John',
                    age: 21
                })).should.be.an.instanceof(User)
                    .and.have.property('attributes').that.is.an('object');
            });
        });
    });
    
});

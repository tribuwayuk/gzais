/*global define*/
define([
  'underscore',
  'backbone',
  'EmployeeModel'
], function(_, Backbone, EmployeeModel) {
  'use strict';

  describe('EmployeeModel', function() {

    it('should be a subclass of Backbone.Model', function() {

      EmployeeModel.prototype.should.be.an.instanceof(Backbone.Model);

    });

    it('should create a new EmployeeModel instance without a param', function() {

      (new EmployeeModel()).should.be.ok.and.an.instanceof(EmployeeModel);

    });

    it('should create a new EmployeeModel instance with a given params', function() {

      var employee = {};
          employee.firstname  = 'Elizar';
          employee.middlename = 'Diano';
          employee.lastname   = 'Pepino';
          employee.email      = 'jupenz@gmail.com';

      var newEmployee = new EmployeeModel(employee);

      newEmployee.should.be.ok;
      newEmployee.get('firstname').should.equal('Elizar');
      newEmployee.get('middlename').should.equal('Diano');
      newEmployee.get('lastname').should.equal('Pepino');
      newEmployee.get('email').should.equal('jupenz@gmail.com');

    });

  });

});

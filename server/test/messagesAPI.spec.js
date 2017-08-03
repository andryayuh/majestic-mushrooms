'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');
const httpMocks = require('node-mocks-http');
const Messages = require('../../db/models/messages.js');


describe('Messages API', function () {

  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/messages/read/:id', function (done) {
    request(app)
      .get('/api/messages/read/abcde12345')
      .expect(res => {
        res.attributes = {
          from: ['test@gmail.com']
        };
      })
      .expect(302)
      .end(done);
  });

  it('retrieves test data', function(done) {
    Messages.forge().fetchAll()
      .then(res => {
        expect(res.length).to.equal(7);
        done();
      })
      .catch(err => { done(err); });
      
  });


});
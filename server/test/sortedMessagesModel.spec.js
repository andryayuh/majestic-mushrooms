const expect = require('chai').expect;
const SortedMessages = require('../../db/models/sortedMessages.js');
const dbUtils = require('../../db/lib/utils.js');

describe('SortedMessages model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function (done) {
    SortedMessages.forge().fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(1);
        expect(results.models[0].id).to.equal(1);
        done();
      })
      .catch(err => { done(err); });
  });

  it('Should be able to delete a record', function (done) {
    // Inserts a user
    SortedMessages.where({ id: 1 }).destroy()
      // verifies that the user has been inserted
      .then(function () {
        return SortedMessages.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).to.equal(null);
        done();
      })
      .catch(function (err) {
        console.log(err);
        done(err);
      });
  });

  it('Should be able to update an already existing record', function (done) {
    SortedMessages.where({ id: 1 }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function () {
        return SortedMessages.where({ id: 1 }).save({ message_id: 'abcde12346', folder_id: 'abcd1237' }, { method: 'update' });
      })
      .then(function () {
        return SortedMessages.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result.get('message_id')).to.equal('abcde12346');
        expect(result.get('folder_id')).to.equal('abcd1237');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

});




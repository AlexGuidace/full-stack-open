const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./api_test_helper');
const User = require('../models/user');

// Write tests and only test the ones that you are currently working on, per the 'NB' provided in the FSO spec. Doing so keeps the feedback loop fast.
// Command for testing this module using this method: npm test -- tests/user_api.test.js

const api = supertest(app);

describe('Tests for the Users API:', () => {
  describe('Ensure invalid users are not created and suitable status codes and error messages are returned', () => {
    describe('Tests for username validation:', () => {
      test('When a username exists in the database, user creation is denied', async () => {
        await User.deleteMany({});
        await new User({ username: 'existingUser' }).save();
        const usersBeforePostRequest = await helper.getUsersInDb();

        // Check status code and content type.
        const response = await api
          .post('/api/users')
          .send({ username: 'existingUser' })
          .expect(409)
          .expect('Content-Type', /application\/json/);

        // Check response body.
        assert.strictEqual(
          response.body.error,
          'Username already exists in the database.'
        );

        const usersAfterPostRequest = await helper.getUsersInDb();

        // Check database state.
        assert.strictEqual(
          usersBeforePostRequest.length,
          usersAfterPostRequest.length
        );
      });

      test('When a username is an empty string, undefined, or null user creation is denied', async () => {
        // Check status code and content type for empty string.
        let response = await api
          .post('/api/users')
          .send({ username: '' })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        // Check response body.
        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );

        // Check status code and content type for undefined case.
        response = await api
          .post('/api/users')
          .send({ password: '123', name: 'Mike' })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );

        // Check status code and content type for null case.
        response = await api
          .post('/api/users')
          .send({ username: null })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );
      });

      test('When a username is less than 3 characters, user creation is denied', async () => {
        const response = await api
          .post('/api/users')
          .send({ username: 'Al' })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );
      });
    });

    describe('Tests for password validation:', () => {
      test('When a password is an empty string, undefined, or null, user creation is denied', async () => {
        let response = await api
          .post('/api/users')
          .send({ password: '' })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );

        response = await api
          .post('/api/users')
          .send({ username: 'Ken53', name: 'Ken' })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );

        response = await api
          .post('/api/users')
          .send({ password: null })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );
      });

      test('When a password is less than 3 characters, user creation is denied', async () => {
        const response = await api
          .post('/api/users')
          .send({ password: '12' })
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(
          response.body.error,
          'Username or password must be at least 3 characters long.'
        );
      });
    });

    // Included to check that the end functionality of creating a user actually happens.
    describe('Happy Path Test:', () => {
      test('When a user does not already exist in the DB and username and password are valid, a user is created', async () => {
        await User.deleteMany({});

        // Ensure correct status code.
        const response = await api
          .post('/api/users')
          .send({ username: 'Alex23', name: 'Alex', password: '123' })
          .expect(201)
          .expect('Content-Type', /application\/json/);

        // Ensure we get back the correct username in the body.
        assert.strictEqual(response.body.username, 'Alex23');

        const usersAfterPostRequest = await helper.getUsersInDb();

        // Ensure the DB has the correct username.
        const usernames = usersAfterPostRequest.map((user) => user.username);
        assert.ok(usernames.includes('Alex23'));
      });
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});

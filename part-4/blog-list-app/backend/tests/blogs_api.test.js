const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
// Supertest is used inside 'node:test' to send HTTP requests to the app and check HTTP responses.
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./api_test_helper');

// Write tests and only test the ones that you are currently working on, per the 'NB' provided in the FSO spec. Doing so keeps the feedback loop fast.
// Command for testing this module using this method: npm test -- tests/blogs_api.test.js

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
});

describe('Tests for the Blogs API:', () => {
  test('The GET request returned the correct number of blogs in JSON format.', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});

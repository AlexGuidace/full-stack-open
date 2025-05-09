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

  test('All Blog objects returned to the client from the API contain a property of `id` for their unique identifier, instead of `_id`', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;

    // If every blog object checked has a property of 'id', the assertion is true.
    assert.strictEqual(
      blogs.every((blog) => Object.hasOwn(blog, 'id')),
      true
    );
  });

  test('A new, valid blog can be added to the database via POST', async () => {
    const newBlog = {
      title: 'Philosophy Talk',
      author: 'Stanford University',
      url: 'https://www.philosophytalk.org/blog-classic',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfterSubmission = await testHelper.getBlogsInDb();

    // Verify that the number of blogs in the database increased by one after newBlog was submitted.
    assert.strictEqual(
      blogsAfterSubmission.length,
      testHelper.initialBlogs.length + 1
    );

    // Verify contents of saved object are the same as the submitted newBlog object.
    assert.deepStrictEqual(
      {
        title: blogsAfterSubmission[2].title,
        author: blogsAfterSubmission[2].author,
        url: blogsAfterSubmission[2].url,
      },
      {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }
    );
  });

  after(async () => {
    await mongoose.connection.close();
  });
});

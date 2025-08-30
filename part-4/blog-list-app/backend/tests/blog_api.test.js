const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
// Supertest is used inside 'node:test' to send HTTP requests to the app and check HTTP responses.
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./api_test_helper');

// Write tests and only test the ones that you are currently working on, per the 'NB' provided in the FSO spec. Doing so keeps the feedback loop fast.
// Command for testing this module using this method: npm test -- tests/blog_api.test.js

const api = supertest(app);
let authToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);

  await User.deleteMany({});

  // Create a new test user.
  await api.post('/api/users').send(testHelper.testUser).expect(201);

  // Log that user in to get a valid authentication token for subsequent API requests.
  const loginResponse = await api
    .post('/api/login')
    .send(testHelper.testUser)
    .expect(200);

  authToken = loginResponse.body.token;
});

describe('Tests for the Blogs API:', () => {
  describe('GET requests', () => {
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
  });

  describe('POST requests', () => {
    test('A new, valid blog can be added to the database via POST', async () => {
      const newBlog = {
        title: 'Philosophy Talk',
        author: 'Stanford University',
        url: 'https://www.philosophytalk.org/blog-classic',
      };

      // Make a POST request to create a new, valid blog.
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${authToken}`)
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

    test('Adding a new blog fails with a `401 Unauthorized` status code if a proper authentication token is not provided by a user', async () => {
      const newBlog = {
        title: 'Philosophy Talk',
        author: 'Stanford University',
        url: 'https://www.philosophytalk.org/blog-classic',
      };

      // Make a POST request without providing an auth token.
      await api.post('/api/blogs').send(newBlog).expect(401);

      // Verify that the number of blogs in the database did not change after newBlog was submitted.
      const blogsAfterSubmission = await testHelper.getBlogsInDb();
      assert.strictEqual(
        blogsAfterSubmission.length,
        testHelper.initialBlogs.length
      );
    });

    // NOTE: The course asks to test that a missing 'likes' property defaults to 0.
    // In my implementation, that logic is handled via frontend checkbox input and backend route logic.
    // The backend POST route always explicitly sets 'likes' based on the value of 'checkbox':
    //
    //   if (body.checkbox === 'on') {
    //     body.likes = 1;
    //   } else {
    //     body.likes = 0;
    //   }
    //
    // So, the 'likes' property is never actually 'missing' from new blog posts; it's always created based on user input. This test reflects that behavior by submitting a blog without a checkbox (simulating an unchecked box), and confirming that 'likes' is 0.
    test('A value of 0 is given to the `likes` property of a newly created blog if the `Do you love this blog` box is unchecked', async () => {
      // Submitting the blog without a checkbox means body.checkbox will be undefined; body.likes will thus be set to 0, according to our route logic shown in the above clarifying 'NOTE'.
      const newBlog = {
        title: 'Philosophy Talk',
        author: 'Stanford University',
        url: 'https://www.philosophytalk.org/blog-classic',
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfterSubmission = await testHelper.getBlogsInDb();

      // Verify that the saved blog now has 0 likes, based on the user not checking the "Do you love this blog" checkbox in the UI. There were 2 blogs already in the database prior to adding this newBlog.
      assert.strictEqual(blogsAfterSubmission[2].likes, 0);
    });

    test('The backend responds with the status code `400 Bad Request` if the `title` or `url` properties are missing when submitting a new blog via POST', async () => {
      const blogWithoutTitle = {
        author: 'Stanford University',
        url: 'https://www.philosophytalk.org/blog-classic',
      };

      const blogWithoutUrl = {
        title: 'Philosophy Talk',
        author: 'Stanford University',
      };

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);
    });
  });

  describe('DELETE requests', () => {
    test('A blog was sucessfully removed from the DB via DELETE', async () => {
      const initialBlogs = await testHelper.getBlogsInDb();

      // Create a new blog in the DB with a valid user attached to it.
      const newBlog = {
        title: 'Philosophy Talk',
        author: 'Stanford University',
        url: 'https://www.philosophytalk.org/blog-classic',
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      // Check to see that the new blog was added to the DB.
      const blogsAfterCreation = await testHelper.getBlogsInDb();
      assert.strictEqual(blogsAfterCreation.length, initialBlogs.length + 1);

      // Delete the new blog.
      const blogToDelete = response.body;

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      // Check to see that the blog was removed from the DB.
      const blogsAfterDeletion = await testHelper.getBlogsInDb();
      assert.strictEqual(
        blogsAfterDeletion.length,
        blogsAfterCreation.length - 1
      );

      const titlesOfBlogsAfterDeletion = blogsAfterDeletion.map(
        (blog) => blog.title
      );

      assert(!titlesOfBlogsAfterDeletion.includes(blogToDelete.title));
    });
  });

  describe('PUT requests', () => {
    test('A blog`s number of `likes` was successfully incremented by 1', async () => {
      const initialBlogs = await testHelper.getBlogsInDb();
      // Initially, this Pokemon blog object has 16 likes.
      const blogToUpdate = initialBlogs[0];

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const updatedBlogs = await testHelper.getBlogsInDb();
      const updatedBlog = updatedBlogs[0];

      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);
    });

    after(async () => {
      await mongoose.connection.close();
    });
  });
});

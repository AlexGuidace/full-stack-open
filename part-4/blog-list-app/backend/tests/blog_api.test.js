const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
// Supertest is used inside 'node:test' to send HTTP requests to the app and check HTTP responses.
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./api_test_helper');

// Write tests and only test the ones that you are currently working on, per the 'NB' provided in the FSO spec. Doing so keeps the feedback loop fast.
// Command for testing this module using this method: npm test -- tests/blog_api.test.js

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
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

      // Log a user in to get a valid auth token.
      const loginResponse = await api
        .post('/api/login')
        .send(testHelper.testUser)
        .expect(200);

      const authToken = loginResponse.body.token;

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
    // So, the 'likes' property is never actually 'missing' from new blog posts; it's always created based on user input. This test reflects that behavior by submitting
    // a blog without a checkbox (simulating an unchecked box), and confirming that 'likes' is 0.
    test('A value of 0 is given to the `likes` property of a newly created blog if the `Do you love this blog` box is unchecked', async () => {
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

      // Verify that the saved blog now has 0 likes, based on the user not checking the "Do you love this blog" checkbox in the UI.
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

      await api.post('/api/blogs').send(blogWithoutTitle).expect(400);
      await api.post('/api/blogs').send(blogWithoutUrl).expect(400);
    });
  });

  describe('DELETE requests', () => {
    test('A blog was sucessfully removed from the DB via DELETE', async () => {
      const initialBlogs = await testHelper.getBlogsInDb();
      const blogToDelete = initialBlogs[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAfterDeletion = await testHelper.getBlogsInDb();

      assert.strictEqual(blogsAfterDeletion.length, initialBlogs.length - 1);

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

      await api.put(`/api/blogs/${blogToUpdate.id}`).expect(200);

      const updatedBlogs = await testHelper.getBlogsInDb();
      const updatedBlog = updatedBlogs[0];

      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1);
    });

    after(async () => {
      await mongoose.connection.close();
    });
  });
});

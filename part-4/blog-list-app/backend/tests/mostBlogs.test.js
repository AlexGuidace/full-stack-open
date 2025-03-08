const { test, describe } = require('node:test');
const assert = require('node:assert');

const { testBlogs, blogWithMostPosts } = require('../utils/test_data');
const { mostBlogs } = require('../utils/testing_functions');

describe('Most blogs', () => {
  test('gets the author with the greatest number of blog posts', () => {
    assert.deepStrictEqual(mostBlogs(testBlogs), blogWithMostPosts);
  });
});
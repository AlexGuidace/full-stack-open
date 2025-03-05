const { test, describe } = require('node:test');
const assert = require('node:assert');

const { testBlogs, blogWithMostLikes } = require('../utils/test_data');
const { favoriteBlog } = require('../utils/testing_functions');

describe('Favorite blog', () => {
  test('calculates correctly to return the blog with the most likes', () => {
    // Use deepStrictEqual() to compare content of JS objects.
    assert.deepStrictEqual(favoriteBlog(testBlogs), blogWithMostLikes);
  });
  test('returns null if the array is empty', () => {
    assert.strictEqual(favoriteBlog([]), null);
  });
});

const { test, describe } = require('node:test');
const assert = require('node:assert');

const { testBlogs, authorWithMostLikes } = require('../utils/test_data');
const { mostLikes } = require('../utils/testing_functions');

describe('Most Likes', () => {
  test('gets the author with the greatest number of likes on their blog posts', () => {
    assert.deepStrictEqual(mostLikes(testBlogs), authorWithMostLikes);
  });
});

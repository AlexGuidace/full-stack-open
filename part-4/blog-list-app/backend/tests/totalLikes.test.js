// Create a describe block that holds multiple tests for the totalLikes function in for_testing.js.
const { test, describe } = require('node:test');
const assert = require('node:assert');

const { testBlogs, singleTestBlogInArray } = require('../utils/test_data');
const { totalLikes } = require('../utils/testing_functions');

describe('Total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0);
  });
  test('equals the likes of one blog when there is only one blog in the list', () => {
    assert.strictEqual(totalLikes(singleTestBlogInArray), 5);
  });
  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLikes(testBlogs), 36);
  });
});

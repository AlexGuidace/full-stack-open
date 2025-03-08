const sortBy = require('lodash/sortBy');

// Dummy test for Exercise 4.3, step 1
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

// Calculates and returns the number of total likes in a list of blogs.
const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0);
};

// Filters out the blog with the most likes.
const favoriteBlog = (blogs) => {
  // reduce(), below, doesn't include an initial value; calling reduce() on an empty array without an initial value throws an error, so we handle this edge case by returning null--which commonly indicates that there was an absence of the value we were looking for (favoriteBlog)--when an empty array comes in as an argument.
  if (blogs.length === 0) {
    return null;
  }

  const favoriteBlogResult = blogs.reduce((blogWithMostLikes, currentBlog) => {
    // We *can* use a ternary operator here in place of an if-else since it's simply a shorthand for the if-else and this example is simple enough, but I'm writing it this way for clarity in how the reduce() function works in this example. In reduce(), whatever is returned from the callback function (to reduce()) becomes the new accumulator value (blogWithMostLikes) for the next iteration; we can clearly see that dynamic in the below if-else statement.
    if (currentBlog.likes > blogWithMostLikes.likes) {
      return currentBlog;
    } else {
      return blogWithMostLikes;
    }
  });

  // Format the result object to prevent comparison errors during tests; because of the way MongoDB works, the _id and __v fields can vary on objects with the same content, so it's best to leave them out of equality testing when we are simply comparing the content of those objects.
  delete favoriteBlogResult._id;
  delete favoriteBlogResult.__v;

  return favoriteBlogResult;
};

// Using Lodash library here. This returns the author who has the largest amount of blog posts on their blog.
const mostBlogs = (blogs) => {
  // Sort blogs based on their blogPost count, in ascending order using the Lodash method _.sortBy().
  const sortedBlogs = sortBy(blogs, ['blogPosts']);
  const blogWithMostPosts = sortedBlogs[sortedBlogs.length - 1];

  // Remove unnecessary data from blogWithMostPosts for object equality comparison in tests.
  const fieldsToDelete = ['_id', 'title', 'url', 'likes', '__v'];

  fieldsToDelete.forEach((field) => {
    delete blogWithMostPosts[field];
  });

  return blogWithMostPosts;
};

// Using Lodash library here. This returns the author who has the largest amount of likes on their blog posts and the like count. Follows the same logic as mostBlogs.
const mostLikes = (blogs) => {
  // Sort blogs based on their like count, in ascending order using the Lodash method _.sortBy().
  const sortedBlogs = sortBy(blogs, ['likes']);
  const authorWithMostLikes = sortedBlogs[sortedBlogs.length - 1];

  // Remove unnecessary data from authorWithMostLikes for object equality comparison in tests.
  const fieldsToDelete = ['_id', 'title', 'url', 'blogPosts', '__v'];

  fieldsToDelete.forEach((field) => {
    delete authorWithMostLikes[field];
  });

  return authorWithMostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

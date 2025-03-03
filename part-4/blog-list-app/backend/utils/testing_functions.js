// Calculates and returns the number of total likes in a list of blogs.
const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0);
};

module.exports = totalLikes;

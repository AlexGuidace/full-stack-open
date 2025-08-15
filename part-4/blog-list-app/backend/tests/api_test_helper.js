const Blog = require('../models/blog');
const User = require('../models/user');

//////////********** Blog helpers. **********//////////

const initialBlogs = [
  {
    title: 'Pokemon News',
    author: 'Bulbasaur',
    url: 'https://www.pokemon.com/us/pokemon-news',
    likes: 16,
  },
  {
    title: 'Bytes.dev',
    author: 'Ui.dev',
    url: 'https://bytes.dev/',
    likes: 12,
  },
];

const getBlogsInDb = async () => {
  const blogs = await Blog.find({});
  // Format each blog to a usable format.
  return blogs.map((note) => note.toJSON());
};

//////////********** User helpers. **********//////////

const getUsersInDb = async () => {
  const users = await User.find({});
  // Format each user to a usable format.
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, getBlogsInDb, getUsersInDb };

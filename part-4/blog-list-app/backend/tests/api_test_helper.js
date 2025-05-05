const Blog = require('../models/blog');

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

module.exports = { initialBlogs };

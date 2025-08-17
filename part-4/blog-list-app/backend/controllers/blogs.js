const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// All of our Blog routes/endpoints.

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

// Check to see if a blog exists, based on URL.
blogsRouter.get('/:encodedUrl', async (request, response) => {
  // Decode the URL from the previous encoding on the frontend. We need to decode it for checking here because the raw URL is what is saved in the DB when we initially POST it to the DB.
  const { encodedUrl } = request.params;
  const decodedUrl = decodeURIComponent(encodedUrl);

  // Blog.exists() returns a document object with an _id field only, if the blog exists.
  const matchingId = await Blog.exists({ url: decodedUrl });

  if (matchingId) {
    const id = String(matchingId._id);
    response.json(id);
  } else {
    response.json(null);
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  // Assign body a field of 'likes' and give body.likes a numerical value based on whether the "Do you love this blog?" checkbox was checked or not.
  // NOTE: If a checkbox is checked, the value of the checkbox will be set to a string of "on" by the browser when the form is submitted (and will be part of request.body above). If the value is "on", then we have a boolean of true. If it's not checked, the checkbox has a value of null.
  if (body.checkbox === 'on') {
    body.likes = 1;
  } else {
    body.likes = 0;
  }

  // Get the first user in the collection.
  const user = await User.findOne();

  if (!user) {
    return response
      .status(400)
      .json({ error: 'userId is missing or not valid.' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// Updates number of likes by 1 on an existing blog.
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  // Use MongoDB $inc operator to increment the value of the likes field by 1 because the checkbox was checked on the frontend for this submission.
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;

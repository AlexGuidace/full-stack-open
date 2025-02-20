const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');

// All of our Blog routes/endpoints.

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

// Check to see if a blog exists, based on URL.
blogsRouter.get('/:encodedUrl', (request, response, next) => {
  // Decode the URL from the previous encoding on the frontend. We need to decode it for checking here because the raw URL is what is saved in the DB when we initially POST it to the DB.
  const { encodedUrl } = request.params;
  const decodedUrl = decodeURIComponent(encodedUrl);

  Blog.exists({ url: decodedUrl })
    .then((result) => {
      if (result) {
        const id = String(result._id);
        response.json(id);
      } else {
        response.json(null);
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  // Assign body a field of 'likes' and give body.likes a numerical value based on whether the "Do you love this blog?" checkbox was checked or not.
  // NOTE: If a checkbox is checked, the value of the checkbox will be set to a string of "on" by the browser when the form is submitted (and will be part of request.body above). If the value is "on", then we have a boolean of true. If it's not checked, the checkbox has a value of null.
  if (body.checkbox === 'on') {
    body.likes = 1;
  } else {
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  const { id } = request.params;

  // Use MongoDB $inc operator to increment the value of the likes field by 1 because the checkbox was checked on the frontend for this submission.
  Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;

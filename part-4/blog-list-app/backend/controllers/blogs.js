const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

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

blogsRouter.post(
  '/',
  middleware.verifyAndGetUserFromRequest,
  async (request, response) => {
    const body = request.body;

    // Assign body a field of 'likes' and give body.likes a numerical value based on whether the "Do you love this blog?" checkbox was checked or not (a boolean value for checkbox).
    if (body.checkbox) {
      body.likes = 1;
    } else {
      body.likes = 0;
    }

    // Get the correct user. When we entered this route, request.user was assigned value through the middleware function: verifyAndGetUserFromRequest.
    const user = await User.findById(request.user.id);

    // If the user is not found (null), we have to handle it.
    if (!user) {
      return response
        .status(400)
        .json({ error: 'User ID is missing or not valid.' });
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
  }
);

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

blogsRouter.delete(
  '/:id',
  middleware.verifyAndGetUserFromRequest,
  async (request, response) => {
    const blogToBeDeleted = await Blog.findById(request.params.id);
    console.log(blogToBeDeleted);

    if (!blogToBeDeleted) {
      const error = new Error(
        'Delete did not happen because blog does not exist.'
      );
      error.name = 'BlogDoesNotExistError';
      throw error;
    }

    // Compare the user ID in the blog to the user ID making the DELETE request. If they match, the request has been validated and we delete the blog. 'blogToBeDeleted.user' contains only the ObjectId of the user, and we convert that object to a string below for comparison purposes.
    if (blogToBeDeleted.user.toString() === request.user.id) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      const error = new Error(
        'Delete forbidden because the current user does not own this blog.'
      );
      error.name = 'CurrentUserNotOwnerOfBlogError';
      throw error;
    }
  }
);

module.exports = blogsRouter;

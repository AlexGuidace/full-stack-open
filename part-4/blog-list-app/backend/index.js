require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.static('dist'));
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl);
console.log('Connected to MongoDB.');

app.use(express.json());
app.use(cors());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// Check to see if a blog exists, based on URL.
app.get('/api/blogs/:encodedUrl', (request, response) => {
  // Decode the URL from the previous encoding on the frontend. We need to decode it for checking here because the raw URL is what is saved in the DB when we initially POST it to the DB.
  const { encodedUrl } = request.params;
  const decodedUrl = decodeURIComponent(encodedUrl);

  Blog.exists({ url: decodedUrl }).then((result) => {
    if (result) {
      const id = String(result._id);
      response.json(id);
    } else {
      response.json(null);
    }
  });
});

app.post('/api/blogs', (request, response) => {
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

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.put('/api/blogs/:id', (request, response) => {
  const { id } = request.params;

  // Use MongoDB $inc operator to increment the value of the likes field by 1 because the checkbox was checked on the frontend for this submission.
  Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).then(
    (result) => {
      response.json(result);
    }
  );
});

const PORT = process.env.PORT;
// Runs locally on http://127.0.0.1:PORT/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

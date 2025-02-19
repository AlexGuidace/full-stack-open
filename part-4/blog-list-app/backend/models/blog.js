const mongoose = require('mongoose');

// Creates schema for our blog documents and adds a Mongoose 'required' validator.
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: true },
});

// Transforms a blog document into JSON, which is transformed into a plain JS object, whenever a blog document is sent back to the client from the database. The transformation adds an id field, and deletes the _id and __v fields from the object, for a cleaner presentation that can be used in the UI.
blogSchema.set('toJson', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);

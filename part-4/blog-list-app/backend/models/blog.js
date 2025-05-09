const mongoose = require('mongoose');

// Creates schema for our blog documents and adds a Mongoose 'required' validator.
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: true },
});

// Transforms a blog document into JSON, which is transformed into a plain JS object, whenever a blog document is sent back to the client from the database. The transformation adds an id field, and deletes the _id and __v fields from the object, for a cleaner presentation that can be used in the UI.
// More details: When a Blog document is returned from Mongoose and passed to response.json() in our route handlers, response.json() calls JSON.stringify() under the hood. JSON.stringify() detects the .toJSON method defined on the document's schema, applies the transformation to the document, and then serializes the transformed JavaScript object into a JSON string (as required by the HTTP protocol). This string is sent to the client, where it's automatically parsed into a usable JavaScript object.
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);

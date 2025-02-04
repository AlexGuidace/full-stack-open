import { useState, useEffect } from 'react';

import Blog from './components/blog';
import blogService from './services/blogs';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialblogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);

    // Update blogs list state to reflect new added blog

    // Clear form fields
    event.target.reset();
  };
  return (
    <div>
      <h1>List of Favorite Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
      <form id="submissionForm" onSubmit={addBlog}>
        <h2>New Blog Submission Form</h2>
        <div className="inputDiv">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="title"
            required
          />
        </div>
        <div className="inputDiv">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            placeholder="Author"
            id="author"
            required
          />
        </div>
        <div className="inputDiv">
          <label htmlFor="url">URL:</label>
          <input type="text" name="url" placeholder="URL" id="url" required />
        </div>
        <div className="inputDiv">
          <label htmlFor="upvotes">Upvotes:</label>
          <input
            type="text"
            name="upvotes"
            placeholder="Upvotes"
            id="upvotes"
            required
          />
        </div>
        <div>
          <button type="submit">Save New Blog</button>
        </div>
      </form>
    </div>
  );
};

export default App;

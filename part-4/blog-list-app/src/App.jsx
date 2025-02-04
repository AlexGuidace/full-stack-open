// import { useState } from 'react';
import './App.css';

const App = () => {
  //   const [blogs, setBlogs] = useState(null);
  //   const [newBlog, setNewBlog] = useState('');

  return (
    <div>
      <h1>List of Favorite Blogs</h1>
      <form id="submissionForm">
        <h2>New Blog Submission Form</h2>
        <div className="inputDiv">
          <label htmlFor="title">Title:</label>
          <input type="text" placeholder="Title" id="title" required />
        </div>
        <div className="inputDiv">
          <label htmlFor="author">Author:</label>
          <input type="text" placeholder="Author" id="author" required />
        </div>
        <div className="inputDiv">
          <label htmlFor="url">URL:</label>
          <input type="text" placeholder="URL" id="url" required />
        </div>
        <div className="inputDiv">
          <label htmlFor="upvotes">Upvotes:</label>
          <input type="text" placeholder="Upvotes" id="upvotes" required />
        </div>
        <div>
          <button type="submit">Save New Blog</button>
        </div>
      </form>
    </div>
  );
};

export default App;

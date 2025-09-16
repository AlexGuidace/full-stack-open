import { useState } from 'react';

/* eslint-disable react/prop-types */
const BlogSubmissionForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    checkbox: false,
  });

  const createNewBlogObject = (event) => {
    event.preventDefault();

    // Add the new blog to the DB.
    addBlog(newBlog);

    // Clear form fields.
    setNewBlog({
      title: '',
      author: '',
      url: '',
      checkbox: false,
    });
  };

  return (
    <form id="blogSubmissionForm" onSubmit={createNewBlogObject}>
      <h2>New Favorite Blog Submission Form</h2>
      <div className="inputDiv">
        <label>
          Title:
          <input
            type="text"
            placeholder="Title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
            required
          />
        </label>
      </div>
      <div className="inputDiv">
        <label>
          Author:
          <input
            type="text"
            placeholder="Author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
            required
          />
        </label>
      </div>
      <div className="inputDiv">
        <label>
          URL:
          <input
            type="text"
            placeholder="URL"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
            required
          />
        </label>
      </div>
      <label>
        <input
          id="checkbox-input"
          type="checkbox"
          name="checkbox"
          checked={newBlog.checkbox}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, checkbox: target.checked })
          }
        />
        Do you love this blog?
      </label>
      <div>
        <button type="submit">Save New Blog</button>
      </div>
    </form>
  );
};

export default BlogSubmissionForm;

/* eslint-disable react/prop-types */
const SubmissionForm = ({ newBlog, setNewBlog, addBlog }) => (
  <form id="submissionForm" onSubmit={addBlog}>
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

export default SubmissionForm;

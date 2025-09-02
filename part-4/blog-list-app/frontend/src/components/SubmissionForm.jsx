/* eslint-disable react/prop-types */
const SubmissionForm = ({ addBlog }) => (
  <form id="submissionForm" onSubmit={addBlog}>
    <h2>New Favorite Blog Submission Form</h2>
    <div className="inputDiv">
      <label>
        Title:
        <input type="text" placeholder="Title" required />
      </label>
    </div>
    <div className="inputDiv">
      <label>
        Author:
        <input type="text" placeholder="Author" required />
      </label>
    </div>
    <div className="inputDiv">
      <label>
        URL:
        <input type="text" placeholder="URL" required />
      </label>
    </div>
    <label>
      <input id="checkbox-input" type="checkbox" name="checkbox" />
      Do you love this blog?
    </label>
    <div>
      <button type="submit">Save New Blog</button>
    </div>
  </form>
);

export default SubmissionForm;

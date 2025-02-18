import { useState, useEffect } from 'react';

import blogService from './services/blogs';
import Blog from './components/blog';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    // Grab title, author, URL from user submission.
    const formData = new FormData(event.target);

    // We need to check, from the services file, to see if the blog is in the database already (by url). We do that so we can change the number of likes on the blog through a PUT endpoint if the user checked the checkbox indicating so. However, if the blog does not yet exist, we call the blog service to create a new blog.
    // Before we do the above, we must encode the URL via JS, to avoid issues with passing a URL's special characters like :/?&= (which have special meaning within the context of the URL structure) within the backend Express endpoint URL.
    const url = formData.get('url');
    const encodedUrl = encodeURIComponent(url);

    blogService.checkExistenceOfBlog(encodedUrl).then((returnedId) => {
      if (returnedId) {
        blogService
          .updateLikesAndReturnUpdatedCollection(returnedId)
          .then((updatedBlogsList) => {
            console.log(
              `We were able to do the Likes update and get the updated list back: ${JSON.stringify(
                updatedBlogsList,
                null,
                2
              )}`
            );
            setBlogs(updatedBlogsList);
          });
      } else {
        // Call the POST method, since the blog doesn't exist yet.
        // Create formObject to send to API endpoint/route.
        const formObject = Object.fromEntries(formData.entries());

        // Update blogs list state to reflect new added blog
        blogService.create(formObject).then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog));
        });

        console.log('New blog created!');
      }
    });

    // Clear form fields.
    event.target.reset();
  };

  return (
    <div>
      <h1>List of Random Users&apos; Favorite Blogs</h1>
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        ) : (
          <h3>(No blogs in the bloglist yet)</h3>
        )}
      </ul>
      <form id="submissionForm" onSubmit={addBlog}>
        <h2>New Favorite Blog Submission Form</h2>
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
        <label>
          <input id="checkbox-input" type="checkbox" name="checkbox" />
          Do you love this blog?
        </label>
        <div>
          <button type="submit">Save New Blog</button>
        </div>
      </form>
    </div>
  );
};

export default App;

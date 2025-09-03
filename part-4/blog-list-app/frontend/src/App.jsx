import { useState, useEffect } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import SubmissionForm from './components/SubmissionForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    checkbox: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Check to see if a logged-in user is saved to local storage. If they are, set up the React app to use their data.
  useEffect(() => {
    const savedLoggedInUser = window.localStorage.getItem('loggedInUser');
    if (savedLoggedInUser) {
      const user = JSON.parse(savedLoggedInUser);
      setUser(user);
      // Set auth token for use in future blog creation.
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const addBlog = async (event) => {
    event.preventDefault();

    const { url, checkbox } = newBlog;

    // We need to check, from the services file, to see if the blog is in the database already (by url). We do that so we can change the number of likes on the blog through a PUT endpoint if the user checked the checkbox indicating so. However, if the blog does not yet exist, we call the blog service to create a new blog.
    // Before we do the above, we must encode the URL via JS, to avoid issues with passing a URL's special characters like :/?&= (which have special meaning within the context of the URL structure) within the backend Express endpoint URL.
    const encodedUrl = encodeURIComponent(url);

    try {
      const existingBlogId = await blogService.checkExistenceOfBlog(encodedUrl);

      if (existingBlogId) {
        if (checkbox) {
          const updatedBlogsList =
            await blogService.updateLikesAndReturnUpdatedCollection(
              existingBlogId
            );

          console.log(
            `We were able to do the Likes update for this blog and get the updated list of blogs back: ${JSON.stringify(
              updatedBlogsList,
              null,
              2
            )}`
          );

          setBlogs(updatedBlogsList);
        } else {
          console.log(
            'The blog exists in the DB already, and the checkbox was not checked, so no likes were added to the blog submitted.'
          );
        }
      } else {
        // Call the POST route, since the blog doesn't exist yet.
        // Update blogs list state to reflect new added blog.
        const createdBlog = await blogService.create(newBlog);
        setBlogs(blogs.concat(createdBlog));

        console.log('New blog created!');
      }

      // Clear form fields.
      setNewBlog({
        title: '',
        author: '',
        url: '',
        checkbox: false,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('The blog was not created.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Log user in and get token, username, name back.
      const user = await loginService.login({ username, password });

      // Save user data to local storage so it can persist even when the React app is reloaded, i.e., on page refresh.
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Set auth token for use in future blog creation.
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');

      console.log('Yippeeee... user logged in!');
      console.log('USER: ', user);
    } catch {
      setErrorMessage('Incorrect credentials provided. Please try again.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    console.log('User successfully logged out.');
  };

  const loginFormProps = {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };

  const submissionFormProps = {
    newBlog,
    setNewBlog,
    addBlog,
  };

  return (
    <div>
      <h1>List of Random Users&apos; Favorite Blogs</h1>
      <Notification message={errorMessage} />
      {!user && <LoginForm {...loginFormProps} />}
      {user && (
        <>
          <div style={{ border: 'solid', padding: '10px', width: '231px' }}>
            <span
              style={{
                color: 'greenyellow',
                backgroundColor: 'black',
                padding: '5px',
              }}
            >
              {user.name}
            </span>{' '}
            <span style={{ marginRight: '5px' }}>is logged in.</span>
            <LogoutButton handleLogout={handleLogout} />
          </div>
          <BlogList blogs={blogs} />
          <SubmissionForm {...submissionFormProps} />
        </>
      )}
    </div>
  );
};

export default App;

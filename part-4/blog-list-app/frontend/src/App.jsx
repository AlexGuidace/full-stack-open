import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import BlogSubmissionForm from './components/BlogSubmissionForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import ContentToggler from './components/ContentToggler';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Used for displaying/hiding wrapped content.
  const contentTogglerRef = useRef();

  // Set info, success, or error notifications that time out, based on app actions.
  const showNotificationMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

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

  // Get blogs to display only if a user is logged in.
  useEffect(() => {
    if (!user) return;
    const getInitialBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll();
        setBlogs(initialBlogs);
      } catch (error) {
        showNotificationMessage(
          `There was an error getting all of the blogs: ${error}`,
          'error'
        );
        console.error(error);
      }
    };

    getInitialBlogs();
  }, [user]);

  const addBlog = async (blogObject) => {
    const { url, checkbox } = blogObject;

    // We need to check, from the services file, to see if the blog is in the database already (by url). We do that so we can change the number of likes on the blog through a PUT endpoint if the user checked the checkbox indicating so. However, if the blog does not yet exist, we call the blog service to create a new blog.
    // Before we do the above, we must encode the URL via JS, to avoid issues with passing a URL's special characters like :/?&= (which have special meaning within the context of the URL structure) within the backend Express endpoint URL.
    const encodedUrl = encodeURIComponent(url);

    try {
      const existingBlogId = await blogService.checkExistenceOfBlog(encodedUrl);

      // If we have an existing blog, first check to see if the user wants to increase the number of likes on the blog.
      if (existingBlogId) {
        if (checkbox) {
          const updatedBlogsList =
            await blogService.updateLikesAndReturnUpdatedCollection(
              existingBlogId
            );

          setBlogs(updatedBlogsList);

          showNotificationMessage(
            `Likes for '${url}' increased by 1.`,
            'success'
          );
          console.log(
            `Success: We were able to do the Likes update for this blog and get the updated list of blogs back: ${JSON.stringify(
              updatedBlogsList,
              null,
              2
            )}`
          );
        } else {
          showNotificationMessage(
            `Entry for '${url}' already exists, so a new one was not created.`,
            'info'
          );
          console.log(
            'Info: The blog exists in the DB already, and the checkbox was not checked, so no likes were added to the existing blog, nor was a new entry created.'
          );
        }
      } else {
        // If we don't have an existing blog, call the POST route.
        // Update blogs list state to reflect new added blog.
        const createdBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(createdBlog));

        // Hide the submission form after the blog is created.
        contentTogglerRef.current.toggleVisibility();

        showNotificationMessage(`New entry for '${url}' created!`, 'success');
        console.log('Success: New blog created!');
      }
    } catch (error) {
      showNotificationMessage(
        `The blog was not created nor updated: ${error}`,
        'error'
      );
      console.error('Error: ', error);
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

      showNotificationMessage(`${user.username} was logged in!`, 'success');

      console.log('Yippeeee... user logged in!');
      console.log('USER: ', user);
    } catch (error) {
      showNotificationMessage(
        `Incorrect credentials provided. Please try again: ${error}`,
        'error'
      );
      console.error('Error: ', error);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedInUser');
    setUser(null);

    showNotificationMessage('User has been logged out successfully.', 'info');
    console.log('Info: User logged out.');
  };

  const blogFormToggler = () => (
    <ContentToggler buttonLabel="Create New Blog" ref={contentTogglerRef}>
      <BlogSubmissionForm addBlog={addBlog} />
    </ContentToggler>
  );

  const loginFormProps = {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };

  return (
    <div>
      <h1>User&apos;s Favorite Blogs</h1>
      <Notification message={message} messageType={messageType} />
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
          {blogFormToggler()}
        </>
      )}
    </div>
  );
};

export default App;

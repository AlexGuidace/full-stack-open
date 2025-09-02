import { useState, useEffect } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import './App.css';
import SubmissionForm from './components/SubmissionForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
        if (formData.get('checkbox') === 'on') {
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
          console.log(
            'The checkbox was not checked, so no likes were added for this blog submission.'
          );
        }
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Log user in and get token, username, name back.
      const user = await loginService.login({ username, password });
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

  const loginFormProps = {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };

  return (
    <div>
      <h1>List of Random Users&apos; Favorite Blogs</h1>
      <Notification message={errorMessage} />
      {!user && <LoginForm {...loginFormProps} />}
      {user && (
        <>
          <span
            style={{
              color: 'greenyellow',
              backgroundColor: 'black',
              padding: '5px',
            }}
          >
            {user.name}
          </span>{' '}
          is logged in.
          <BlogList blogs={blogs} />
          <SubmissionForm addBlog={addBlog} />
        </>
      )}
    </div>
  );
};

export default App;

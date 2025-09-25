/* eslint-disable react/prop-types */
import { useState } from 'react';

import BlogDetails from './BlogDetails';

const Blog = ({ blog, addLike, showNotificationMessage, user, deleteBlog }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  // When isContentVisible is true, change the details button text to 'Hide Details'.
  const detailsButtonText = isContentVisible ? 'Hide Details' : 'View Details';

  // When isContentVisible is true, display the blogDetails component.
  const contentStyle = { display: isContentVisible ? '' : 'none' };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleDeleteBlog = async () => {
    try {
      const wasDeleteConfirmed = await deleteBlog(blog.id, blog.title);
      if (!wasDeleteConfirmed) return;

      showNotificationMessage(`'${blog.title}' was deleted`, 'success');
      console.log(`Success: 204: '${blog.title}' was deleted.`);
    } catch (error) {
      showNotificationMessage(
        `'${blog.title}' was not deleted: ${error}`,
        'error'
      );
      console.error('Error: ', error);
    }
  };

  return (
    <li className="blog">
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.title}
        </a>{' '}
        by <span style={{ marginRight: '10px' }}>{blog.author}</span>
        <button onClick={toggleContentVisibility}>{detailsButtonText}</button>
        {user.username === blog.user.username && (
          <button onClick={handleDeleteBlog} style={{ marginLeft: '5px' }}>
            Delete
          </button>
        )}
        <div style={contentStyle}>
          <BlogDetails
            blog={blog}
            addLike={addLike}
            showNotificationMessage={showNotificationMessage}
          />
        </div>
      </div>
    </li>
  );
};

export default Blog;

/* eslint-disable react/prop-types */
import { useState } from 'react';

import BlogDetails from './BlogDetails';

const Blog = ({ blog }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  // When isContentVisible is true, change the details button text to 'Hide Details'.
  const detailsButtonText = isContentVisible ? 'Hide Details' : 'View Details';

  // When isContentVisible is true, display the blogDetails component.
  const contentStyle = { display: isContentVisible ? '' : 'none' };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <li className="blog">
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.title}
        </a>{' '}
        by <span style={{ marginRight: '10px' }}>{blog.author}</span>
        <button onClick={toggleContentVisibility}>{detailsButtonText}</button>
        <div style={contentStyle}>
          <BlogDetails blog={blog} />
        </div>
      </div>
    </li>
  );
};

export default Blog;

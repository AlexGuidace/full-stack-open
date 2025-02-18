/* eslint-disable react/prop-types */
const Blog = ({ blog }) => {
  return (
    <li className="blog">
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.title}
        </a>{' '}
        by {blog.author}. It is has <strong>{blog.likes} likes</strong>.
      </div>
    </li>
  );
};

export default Blog;

import Blog from './Blog';

/* eslint-disable react/prop-types */
const BlogList = ({ blogs }) => {
  if (blogs.length === 0) return <h3>(No blogs in the bloglist yet)</h3>;

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;

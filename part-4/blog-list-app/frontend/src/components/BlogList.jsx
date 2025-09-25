import Blog from './Blog';

/* eslint-disable react/prop-types */
const BlogList = ({
  blogs,
  addLike,
  showNotificationMessage,
  user,
  deleteBlog,
}) => {
  if (blogs.length === 0) return <h3>(No blogs in the bloglist yet)</h3>;

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          showNotificationMessage={showNotificationMessage}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </ul>
  );
};

export default BlogList;

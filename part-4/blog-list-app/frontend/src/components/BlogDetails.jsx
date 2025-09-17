/* eslint-disable react/prop-types */
const BlogDetails = ({ blog }) => {
  return (
    <div className="blogDetails">
      <h3 style={{ margin: '10px 0px 10px 0px' }}>-----Blog Details-----</h3>
      <div>
        <span>URL:</span>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        <span>Likes:</span> {blog.likes}
        <button style={{ marginLeft: '10px' }}>Add Like</button>
      </div>
      <div>
        <span>Name:</span> {blog.user.name}
      </div>
      <div>
        <span>Username:</span> {blog.user.username}
      </div>
    </div>
  );
};

export default BlogDetails;

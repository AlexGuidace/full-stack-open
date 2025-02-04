const Blog = ({ blog }) => {
  return (
    <li className="blog">
      <div>
        {blog.title} by {blog.author}. It is located at {blog.url} and has
        {blog.upvotes} upvotes.
      </div>
    </li>
  );
};

export default Note;

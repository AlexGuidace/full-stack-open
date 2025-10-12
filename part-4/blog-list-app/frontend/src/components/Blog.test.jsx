import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('Checks that a Blog component displays its blog title and author on render. Checks that a Blog component does not display its URL or number of Likes by default.', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'www.test',
    likes: 23,
    user: { username: 'Test User' },
  };

  // Provide a username so the Delete button inside the blog doesn't crash.
  const user = { username: 'Test User' };

  render(<Blog blog={blog} user={user} />);

  expect(screen.getByText('Test Blog')).toBeDefined();
  expect(screen.getByText('Test Author')).toBeDefined();

  const url = screen.getByText(blog.url);
  const likes = screen.getByText(blog.likes);

  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
});

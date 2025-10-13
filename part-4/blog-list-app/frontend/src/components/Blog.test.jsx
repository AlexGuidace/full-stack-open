import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('Checks that a Blog component`s URL and number of likes are shown when the `View Details` button is clicked.', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'www.test',
    likes: 23,
    user: { username: 'Test User' },
  };
  // Provide a username so the Delete button inside the blog doesn't crash.
  const userObject = { username: 'Test User' };

  const user = userEvent.setup();

  render(<Blog blog={blog} user={userObject} />);

  const viewDetailsButton = screen.getByText('View Details');
  await user.click(viewDetailsButton);

  expect(screen.getByText(blog.likes)).toBeDefined();
  expect(screen.getByText(blog.url)).toBeDefined();
});

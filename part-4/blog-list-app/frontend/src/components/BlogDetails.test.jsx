import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('Checks that clicking the `Add Like` button in BlogDetails twice calls the addLike handler passed in as a prop twice.', async () => {
  const blog = {
    id: '1',
    user: { username: 'Test User' },
  };
  // Provide a username so the Delete button inside the blog doesn't crash.
  const userWithUsernameField = { username: 'Test User' };

  const addLike = vi.fn();
  const dummyShowNotificationMessage = vi.fn();
  const user = userEvent.setup();

  render(
    <Blog
      blog={blog}
      user={userWithUsernameField}
      addLike={addLike}
      showNotificationMessage={dummyShowNotificationMessage}
    />
  );

  await user.click(screen.getByText('Add Like'));
  await user.click(screen.getByText('Add Like'));

  expect(addLike).toHaveBeenCalledTimes(2);
});

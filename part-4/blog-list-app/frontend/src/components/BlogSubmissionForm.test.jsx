import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogSubmissionForm from './BlogSubmissionForm';

test('Checks that clicking the `Save New Blog` button in BlogSubmissionForm calls the addBlog handler passed in as a prop to the form, and confirms the right blog fields were provided in the blog object passed into addblog.', async () => {
  const addBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogSubmissionForm addBlog={addBlog} />);

  await user.type(screen.getByPlaceholderText('Title'), 'Test Blog');
  await user.type(screen.getByPlaceholderText('Author'), 'Tester');
  await user.type(screen.getByPlaceholderText('URL'), 'https://testblog.com');

  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  await user.click(screen.getByText('Save New Blog'));

  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Tester',
    url: 'https://testblog.com',
    checkbox: true,
  });
});

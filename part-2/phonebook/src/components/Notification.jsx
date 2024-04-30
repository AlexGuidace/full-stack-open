/* eslint-disable react/prop-types */
const Notification = ({ isError, message }) => {
  if (message === null) {
    return null;
  }

  // Change style of notification component depending on whether the CRUD operation was a success or returned an error.
  let notificationStyle;
  isError ? (notificationStyle = 'error') : (notificationStyle = 'success');

  return <div className={notificationStyle}>{message}</div>;
};

export default Notification;

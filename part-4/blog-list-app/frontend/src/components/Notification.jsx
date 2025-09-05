/* eslint-disable react/prop-types */
const Notification = ({ isError, message }) => {
  if (!message) return null;

  const fontColor = isError ? 'red' : 'green';

  return (
    <div className="notification" style={{ color: fontColor }}>
      {message}
    </div>
  );
};

export default Notification;

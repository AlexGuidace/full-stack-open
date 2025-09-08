/* eslint-disable react/prop-types */
const Notification = ({ message, messageType }) => {
  if (!message) return null;


  return (
    <div className={`notification ${messageType}`}>
      {message}
    </div>
  );
};

export default Notification;

/* eslint-disable react/prop-types */
const LogoutButton = ({ handleLogout }) => {
  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{ width: '100px', height: '25px' }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

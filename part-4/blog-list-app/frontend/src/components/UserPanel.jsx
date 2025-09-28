/* eslint-disable react/prop-types */
import LogoutButton from './LogoutButton';

const UserPanel = ({ user, handleLogout }) => {
  return (
    <div className="userPanel">
      <span>{user.name} is logged in.</span>
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
};

export default UserPanel;

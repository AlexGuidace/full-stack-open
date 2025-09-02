/* eslint-disable react/prop-types */
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => (
  <form id="loginForm" onSubmit={handleLogin}>
    <h2>Log In</h2>
    <div className="inputDiv">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
    </div>
    <div className="inputDiv">
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
    </div>
    <div>
      <button type="submit">Log in</button>
    </div>
  </form>
);

export default LoginForm;

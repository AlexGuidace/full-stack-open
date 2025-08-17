const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

// Validate and create a unique token for a user.
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  // Payload.
  const userInfo = {
    username: user.username,
    id: user._id,
  };

  // Create a new JWT (token) for a user on every login. Every token created is unique.
  // Token expires in 60*60 seconds, i.e., 1 hour.
  const token = jwt.sign(userInfo, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  // Send token to client.
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;

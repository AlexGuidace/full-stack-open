const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // Check to see if a username exists in the DB.
  const usernameId = await User.findOne({ username: username });

  // If a username exists, then it's not unique, so we won't create a new user.
  if (usernameId) {
    return response
      .status(409)
      .json({ error: 'Username already exists in the database.' });
  }

  // If there is no username/password and the lengths are less than 3 characters, we won't create a new user.
  if (
    !username ||
    username.trim().length < 3 ||
    !password ||
    password.trim().length < 3
  ) {
    return response.status(400).json({
      error: 'Username or password must be at least 3 characters long.',
    });
  }

  // Hash the new password and ONLY save the hash to the DB. The actual password isn't saved anywhere.
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;

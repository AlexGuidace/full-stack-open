// Module for custom middleware functions that handle request and response objects.
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('HTTP REQUEST INFO: ');
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  logger.info('Body: ', request.body);
  logger.info('-------------------------------');

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'An unknown endpoint was requested.' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(
    'An error occurred. Message from errorHandler function: ',
    error.message
  );

  if (error.names === 'CastError') {
    return response
      .status(400)
      .send({ error: 'A malformatted id was found in the URL.' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  // Sends a generic, default error message to the client if the above conditions haven't been met and no other custom error handling has been defined.
  next(error);
};

// Get JWT from user request.
// (Does not include next() as the course instructs, due to implementation of 'express-async-errors' library in app.js, which removes the need to write next().)
const getAuthTokenFromRequest = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    // Replace 'Bearer' with an empty string, because we only want the JWT token string from the request, and assign the JWT in a token field we've defined inside the request object.
    request.token = authorization.replace('Bearer ', '');
  }

  // Pass control to the next middlewhere in app.js after this function executes.
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getAuthTokenFromRequest,
};

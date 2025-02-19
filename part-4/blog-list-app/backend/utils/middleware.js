// Module for custom middleware.

const logger = require('./logger');

const requestLogger = (request) => {
  logger.info('HTTP REQUEST INFO: ');
  logger.info('Method: ', request.method);
  logger.info('Path: ', request.path);
  logger.info('Body: ', request.body);
  logger.info('-------------------------------');
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'An unknown endpoint was requested.' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(
    'An error occurred. Message from errorHandler function: ',
    error.message
  );

  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: 'A malformatted id was found in the URL.' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  // Sends a generic, default error message to the client if the above conditions haven't been met and no other custom error handling has been defined.
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};

// Library that allows us to eliminate try-catch blocks in blogs.js. Errors are automatically passed to error-handling middleware through this library.
require('express-async-errors');
// Configuration module.
const config = require('./utils/config');
// Core external libraries.
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// Internal modules.
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);

logger.info(`Connecting to database: ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to database');
  })
  .catch((error) => {
    logger.error('Error connecting to database: ', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

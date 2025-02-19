const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

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

app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT;
// Runs locally on http://127.0.0.1:PORT/
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

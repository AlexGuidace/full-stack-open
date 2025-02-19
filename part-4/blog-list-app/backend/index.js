const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);

console.log(`Connecting to database: ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error.message}`);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT;
// Runs locally on http://127.0.0.1:PORT/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

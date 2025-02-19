require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl);
console.log('Connected to MongoDB.');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api/blogs', blogsRouter);

const PORT = process.env.PORT;
// Runs locally on http://127.0.0.1:PORT/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

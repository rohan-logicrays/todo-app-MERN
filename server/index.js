// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define API routes
const taskRoutes = require('./routes/taksRoutes');
app.use('/api/tasks', taskRoutes);
const authRoutes = require('./routes/authRoutes');
app.use("/api/auth", authRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

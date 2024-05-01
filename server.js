const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/food_order_app');

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(-1);
});
db.once('open', () => {
  console.log('MongoDB connected');
});

// Body parser middleware
app.use(bodyParser.json());

// Define the schema and model here

// Routes
app.use('/api/orders', require('./routes/orders'));

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

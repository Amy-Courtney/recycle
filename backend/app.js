// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a simple GET route at the root URL
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const path = require('path');
const dirtRoutes = require('./routes/dirt');

// Middleware to serve files statically from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the dirt routes with prefix /api/dirt
app.use('/api/dirt', dirtRoutes);

// Export the app object so it can be used by server.js
module.exports = app;
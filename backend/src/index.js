const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv').config(); // Load environment variables from .env file

const PORT =  process.env.PORT || 8000;  // Assigning port 

const app = express();

/**
 * Middleware setup
 */

app.use(morgan("dev"));
app.use(cors()); // 
app.use(bodyParser.urlencoded({ extended: false })) // Middleware to parse URL-encoded data.
app.use(bodyParser.json()) // Middleware to parse incoming JSON requests.

/**
 *  Route definitions
 */
app.use('/', routes);

/**
 * Starting the server
 */
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

/**
 * Exception handling
 */
// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit the process to avoid unknown state
});
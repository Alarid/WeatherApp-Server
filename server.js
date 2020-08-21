const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Setup server
const app = express();
const port = 3000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load API routes
const routes = require('./routes.js');
app.use('/api/v1/', routes);

// Handle 404
app.use(function(req, res) {
  res.send('404: Page not Found', 404);
});

// Handle 500
app.use(function(error, req, res, next) {
  res.send('500: Internal Server Error', 500);
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
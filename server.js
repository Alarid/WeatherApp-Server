const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Setup server
const app = express();
const port = 5000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load API routes
const routes = require('./routes');
app.use('/api/v1/', routes);

// Handle 404
app.use(function(req, res) {
  res.status(404).send('404: Page not Found');
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500).send('500: Internal Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
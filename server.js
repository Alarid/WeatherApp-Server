const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Setup server
const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors
const allowedOrigins = ['http://localhost:3000',
                      'https://alarid.github.io'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

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
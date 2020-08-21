
module.exports = {
  // Middleware to check city name get param
  missingCityName: (req, res, next) => {
    if (!req.query.city) {
      res.status(400).send('Missing city name');
      return;
    }
    next();
  },
  // Middleware to check city name get param
  missingCityId: (req, res, next) => {
    if (!req.query.id) {
      res.status(400).send('Missing city id');
      return;
    }
    next();
  },
  // Middleware to check lat and lon params
  missingCoords: (req, res, next) => {
    if (!req.query.lat || !req.query.lon) {
      res.status(400).send('Missing lat and lon parameters');
      return;
    }
    next();
  },
  // Middleware to check the existence of the API Key in ENV variables
  checkApiKey: (req, res, next) => {
    if (!process.env.OWA_KEY) {
      res.status(500).send('API Key not provided');
      return;
    }
    next();
  }
}
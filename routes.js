const express = require('express');
const router = express.Router();
const axios = require('axios');

const middlewares = require('./middlewares');
const { apiError } = require('./errors');

const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OWA_KEY;

// API Request params for all requests
const apiRequestParams = {
  units: 'metric',
  appid: API_KEY,
};

// Middleware to check the existence of the API Key
router.use(middlewares.checkApiKey);

// Make the actual request to the API
const makeRequest = (request, params, res) => {
  axios.get(`${API_URL}${request}`, { params: params })
    .then((response) => response.data)
    .then((data) => res.status(200).json(data))
    .catch((error) => apiError(error, res));
}

// Fetch current weather for the given city
router.get('/weather', middlewares.missingCityName, (req, res) => {
  let params = {
    q: req.query.city + (req.body.country ? `,${req.body.country}` : ''),
    ...apiRequestParams,
  };
  makeRequest('/weather', params, res);
});

// Fetch forecast for a given city id
router.get('/forecast', middlewares.missingCityId, (req, res) => {
  let params = {
    id: req.query.id,
    ...apiRequestParams,
  };

  makeRequest('/forecast', params, res);
});

// Fetch hourly forecast for a given lat and lon
router.get('/onecall', middlewares.missingCoords, (req, res) => {
  let params = {
    lat: req.query.lat,
    lon: req.query.lon,
    ...apiRequestParams,
  };

  makeRequest('/onecall', params, res);
})

module.exports = router;
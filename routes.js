const express = require('express');
const router = express.Router();

const weatherTest = [
  {
    main: 'Clouds',
    description: 'Shit load of clouds man',
  },
  {
    main: 'Rain',
    description: "It's raining men !",
  },
];

router.get('/', (req, res) => {
  res.json(weatherTest);
});

module.exports = router;
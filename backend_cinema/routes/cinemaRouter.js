const express = require('express');
const cinemaController = require('../controllers/cinemaController');

const router = express.Router();

router
    .get("/getAllCinemas", cinemaController.getAllCinemas);

module.exports = router;
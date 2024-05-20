const express = require('express');
const cinemaController = require('../controllers/cinemaController');

const router = express.Router();

router
    .get("/getAllCinemas", cinemaController.getAllCinemas)
    .post("/createCinema", cinemaController.createCinema);
module.exports = router;
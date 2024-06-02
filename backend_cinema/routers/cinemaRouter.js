const express = require('express');
const cinemaController = require('../controllers/cinemaController');
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router
    .get("/getAllCinemas", cinemaController.getAllCinemas)
    .post("/createCinema", cinemaController.createCinema)
    .patch("/updateCinema/:id", cinemaController.updateCinema)
    .delete("/deleteCinema", cinemaController.deleteCinema)
    .get("/getCinema/:id", cinemaController.getCinema);

module.exports = router;
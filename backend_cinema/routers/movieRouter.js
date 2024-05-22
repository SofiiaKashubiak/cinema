const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router
    .get("/getAllMovies", movieController.getMovies)
    .get("/getMovie/:id", movieController.getMovie)
    .post("/createMovie", movieController.createMovie);



module.exports = router;
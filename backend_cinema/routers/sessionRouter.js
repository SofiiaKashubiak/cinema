const express = require('express');
const sessionController = require('../controllers/sessionController');
const movieController = require("../controllers/movieController");

const router = express.Router();

router
    .get("/getSession/:id", sessionController.getSession)
    .post("/deleteSession", sessionController.deleteSession)
    .post("/createSession", sessionController.createSession)
    .patch("/updateSession/:id", sessionController.updateSession)
    .get("/getAllSessions", sessionController.getAllSessions);
module.exports = router;
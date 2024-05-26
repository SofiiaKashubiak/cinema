const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router
    .get("/getSession/:id", sessionController.getSession)
    .post("/deleteSession", sessionController.deleteSession)
    .post("/createSession", sessionController.createSession);
module.exports = router;
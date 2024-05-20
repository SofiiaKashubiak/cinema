const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router
    .post("/deleteSession/:id", sessionController.deleteSession)
    .post("/createSession", sessionController.createSession);
module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
    .post("/createUser", userController.createUser)
    .post("/editUser", userController.editUser)
    .post("/newPassword", userController.changePassword);

module.exports = router;
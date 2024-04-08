const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();


router
    .get('/getUserByToken', userController.getUserByToken)
    .get('/getUserTickets', userController.getUserTickets)
    .post('/signup', authController.signup)
    .post('/login', authController.login)
    .post("/loginViaReservePassword", authController.loginViaReservePassword)
    .post('/forgotPassword', authController.createReservePassword)
    .patch('/updateUser', userController.updateUser)
    .delete('/deleteUser', userController.deleteUser);

module.exports = router;
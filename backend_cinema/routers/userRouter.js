const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();


router
    .get('/getUserByToken', userController.getTokenAsParameter, userController.getUserByToken)
    .get('/getUserTickets', userController.getTokenAsParameter, userController.getUserTickets)
    .post('/signup', authController.signup)
    .post('/login', authController.login)
    .post("/loginViaReservePassword", authController.loginViaReservePassword)
    .post('/createReservePassword', authController.createReservePassword)
    .patch('/updateUser', userController.getTokenAsParameter, userController.updateUser)
    .delete('/deleteUser', userController.deleteUser)
    .post("/createUser", userController.createUser)


module.exports = router;
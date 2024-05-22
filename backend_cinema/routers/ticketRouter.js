const express = require('express');
const payController = require('../controllers/payController');

const router = express.Router();

router
    .post("/buyTicket", payController.buyTicket)
    // .post("/sellTicket", 'ticketController.deleteTicket');
module.exports = router;
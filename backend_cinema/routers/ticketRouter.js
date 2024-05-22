const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router
    .post("/buyTicket", ticketController.buyTicket)
    .post("/deleteTicket/:id", ticketController.deleteTicket);
module.exports = router;
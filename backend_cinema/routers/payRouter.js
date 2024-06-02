const payController = require('../controllers/payController');
const express = require('express');
const router = express.Router();

router
    .get('/success/:sessionId', payController.checkoutSuccess)
    .get('/cancel/:sessionId', payController.checkoutCancel)
    .post('/buyTicket', payController.buyTicket)
    .get('/tickets/:sessionId', payController.getTicketsBySessionId);

module.exports = router;
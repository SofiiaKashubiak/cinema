const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ticketId: {
        type: mongoose.Schema.ObjectId,
        ref: "Ticket",
        required: true
    },
    places: {
        type: Map,
        of: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.ObjectId,
        ref: "Session",
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
        required: true
    }
});


const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
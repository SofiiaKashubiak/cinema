const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.ObjectId,
        ref: "Session",
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
        required: true
    },
    place: {
        type: Number,
        required: true
    },
});


const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
import * as mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        required: true
    },
    cinemaId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cinema',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    quantityAvailablePlaces: {
        type: Number,
        required: true
    }
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
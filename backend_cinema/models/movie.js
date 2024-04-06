import * as mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genres: [{
        type: String,
        enum: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller"],
        required: true
    }],
    language: {
        type: String,
        required: true
    },
    trailerLink: {
        type: String,
        required: true
    },
    actors: [{
        type: String,
        required: true
    }],
    director: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
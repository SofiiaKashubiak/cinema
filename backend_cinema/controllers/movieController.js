const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movieModel");
const mongoose = require('mongoose');


exports.getMovies = catchAsync(async (req, res, next) => {
    const movies = await Movie.find();
    res.status(200).json({
        status: 'success',
        data: {
            movies
        }
    });
});


exports.getMovie = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            movie
        }
    });
});


exports.createMovie = catchAsync(async (req, res, next) => {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            movie: newMovie
        }
    });
});
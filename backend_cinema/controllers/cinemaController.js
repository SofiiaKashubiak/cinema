const Cinema = require('../models/cinemaModel');
const catchAsync = require('../utils/catchAsync');
const Session = require("../models/sessionModel");
const Movie = require("../models/movieModel");


exports.getAllCinemas = catchAsync(async (req, res, next) => {
    const cinemas = await Cinema.find();
    res.status(200).json({
        status: 'success',
        data: {
            cinemas
        }
    });
});

exports.createCinema = catchAsync(async (req, res, next) => {
    const newCinema = await Cinema.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newCinema
        }
    });
});

exports.updateCinema = catchAsync(async (req, res, next) => {
    const cinema = await Cinema.findById(req.params.id);
    cinema.name = req.body.name || cinema.name;
    cinema.location = req.body.location || cinema.location;
    cinema.quantityRows = req.body.quantityRows || cinema.quantityRows;
    cinema.quantityPlacesInRow = req.body.quantityPlacesInRow || cinema.quantityPlacesInRow;
    await cinema.save();
    res.status(201)
        .json({
            success: "success",
            cinema
        });
});
exports.getCinema = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const cinema = await Cinema.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            cinema
        }
    });
});
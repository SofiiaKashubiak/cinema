const Cinema = require('../models/cinemaModel');
const catchAsync = require('../utils/catchAsync');


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
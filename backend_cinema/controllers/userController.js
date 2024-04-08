const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");


exports.getUserByToken = catchAsync(async (req, res, next) => {
    const token = req.params.token;
    if (!token) return next(new AppError('Token not found', 403));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("+password");

    if (!currentUser) return next(new AppError("User don't exist", 401));

    const role = currentUser.role;
    const id = currentUser._id;


    res.status(201).json({
        status: 'success',
        user: currentUser,
        id,
        role
    });
});



exports.getUserTickets = catchAsync(async (req, res, next) => {
    const token = req.params.token;
    if (!token) return next(new AppError('Token not found', 403));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) return next(new AppError("User don't exist", 401));

    const tickets = Ticket.find({userId: currentUser._id});

    return res.status(201).json({
        status: 'success',
        tickets
    });
});


exports.updateUser = catchAsync(async (req, res, next) => {
    const token = req.params.token;
    if (!token) return next(new AppError('Token not found', 403));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let user = User.findById(decoded.id);
    user.phoneNumber = req.body.phoneNumber;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    user.markModified("name");

    user.save();

    res.status(201)
        .json({
            success: "success",
            user
        });
});


exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = User.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: 'success',
        user
    });
});

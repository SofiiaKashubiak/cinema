const catchAsync = require("../utils/catchAsync");
const Session = require("../models/sessionModel");


exports.getSession = catchAsync(async (req, res, next) => {
    const session = await Session.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            session
        }
    });
});

exports.createSession = catchAsync(async (req, res, next) => {
    const newSession = await Session.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newSession
        }
    });
});
exports.deleteSession = catchAsync(async (req, res, next) => {
    const deletedSession = await Session.deleteOne({id: req.body.id});
    res.status(201).json({
        status: 'success',
        data: {
            deletedSession
        }
    });
});
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newUser
        }
    });
});
exports.editUser = catchAsync(async (req, res, next) => {
    const editUser = req.body;
    const filter = {id: editUser.id};
    const updates = {
        $set: {
            phoneNumber: editUser.phoneNumber,
            firstName: editUser.firstName,
            lastName: editUser.lastName
        }
    }
    const result = await User.updateOne(filter, updates)
    res.status(201).json({
        status: 'success',
        data: {
            result
        }
    });
})
exports.changePassword = catchAsync(async (req, res, next) => {
    const editUser = req.body;
    const filter = {id: editUser.id};
    const updates = {
        $set: {
            password: editUser.password,
        }
    }
    const result = await User.updateOne(filter, updates)
    res.status(201).json({
        status: 'success',
        data: {
            result
        }
    });
})

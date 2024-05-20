const catchAsync = require("../utils/catchAsync");
const Ticket = require("../models/ticketModel");

exports.buyTicket = catchAsync(async (req, res, next) => {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newTicket
        }
    });
});
exports.deleteTicket = catchAsync(async (req, res, next) => {
    const deletedTicket = await Ticket.deleteOne({id: req.params.id});
    res.status(201).json({
        status: 'success',
        data: {
            deletedTicket
        }
    });
});
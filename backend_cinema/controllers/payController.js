const catchAsync = require('../utils/catchAsync');
const Session = require('../models/sessionModel');
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.buyTicket = catchAsync(async (req, res, next) => {
    const emailPlace = req.body.emailPlace;

    const session = Session.findById(req.params.sessionId)
        .populate({
            path: 'movieId',
            select: 'title _id'
        })
        .populate({
            path: 'cinemaId',
            select: 'name'
        });

    if (!session) return next(new AppError("Session don't exist", 401));

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.SERVER_URL}:${process.env.PORT}/success/${CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SERVER_URL}:${process.env.PORT}/cancel`,
        payment_method_types: ['card'],
        mode: 'payment',
        metadata: {
            sessionId: session._id,
            emailPlace

        },
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Ticket',
                    },
                    unit_amount: session.price - session.price * sessiond.discount / 100,
                },
                quantity: 1,
            },
        ],
    });

    res.status(200).json({
        status: "success",
        stripeSession
    });
});


exports.checkoutSuccess = catchAsync(async (req, res, next) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    for (var email of Object.keys(session.metadata.emailPlace)) {
        const ticket = await Ticket.create({
            userId: item.userId,
            sessionId: item.sessionId,
            place: session.metadata.emailPlace[email],
            email: email
        });
    }
});

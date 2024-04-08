const catchAsync = require('../utils/catchAsync');
const Session = require('../models/sessionModel');
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.buyTicket = catchAsync(async (req, res, next) => {
    const session = Session.findById(req.params.sessionId)
        .populate({
            path: 'movieId',
            select: 'title _id'
        })
        .populate({
            path: 'cinemaId',
            select: 'name'
        });

    const token = req.params.token;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let user = User.findById(decoded.id);

    if (!user || !session) return next(new AppError("User or session don't exist", 401));

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        payment_method_types: ['card'],
        mode: 'payment',
        metadata: {
            userId: user._id,
            sessionId: session._id
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
});

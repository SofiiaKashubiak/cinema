const catchAsync = require('../utils/catchAsync');
const Session = require('../models/sessionModel');
const Payment = require('../models/paymentModel');
const Ticket = require('../models/ticketModel');
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.buyTicket = catchAsync(async (req, res, next) => {
    const emailPlace = req.body.emailPlace;

    const session = await Session.findById(req.body.sessionId)
        .populate({
            path: 'movieId',
            select: 'title _id'
        })
        .populate({
            path: 'cinemaId',
            select: 'name'
        });

    if (!session) return next(new AppError("Session don't exist", 401));

    session.price = 100;
    const payment = await Payment.create({
        emailCustomer: req.body.email,
        tickets: [],
        totalPrice: (session.price - session.price * session.discount / 100) * Object.keys(emailPlace).length
    });

    for (var email of Object.keys(emailPlace)) {
        await Ticket.create({
            paymentId: payment._id,
            movieId: session.movieId._id,
            sessionId: session._id,
            place: emailPlace[email],
            email: email
        });
    }

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.SERVER_URL}:${process.env.PORT}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SERVER_URL}:${process.env.PORT}/cancel/{CHECKOUT_SESSION_ID}`,
        payment_method_types: ['card'],
        mode: 'payment',
        metadata: {
            sessionId: session._id.toString(),
            paymentId: payment._id.toString(),
        },
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Ticket',
                    },
                    unit_amount: session.price - session.price * session.discount / 100,
                },
                quantity: Object.keys(emailPlace).length
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
    const payment = await Payment.findById(session.metadata.paymentId);

    payment.isPaid = true;
    await payment.save();

    res.status(200).json({
        status: "success",
        message: "Payment successful"
    });
});


exports.checkoutCancel = catchAsync(async (req, res, next) => {
    const payment = await Payment.findById(session.metadata.paymentId);
    await Ticket.deleteMany({paymentId: payment._id});
    await Payment.findByIdAndDelete(payment._id);

    res.status(200).json({
        status: "success",
        message: "Payment canceled"
    });
});

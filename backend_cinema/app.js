var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require("path");
const morgan = require('morgan');
const AppError = require('./utils/appError');
// const rateLimit = require("express-rate-limit");
const mongo_sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
// const errorHandler = require("./controllers/errorController");
const cors = require("cors");

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


module.exports = app;

const  express = require('express');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const morgan = require('morgan');
const AppError = require('./utils/appError');
// const rateLimit = require("express-rate-limit");
const mongo_sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const errorHandler = require("./controllers/errorController");
const cors = require("cors");
const movieRouter = require("./routers/movieRouter");
const cinemaRouter = require("./routers/cinemaRouter");
const userRouter = require("./routers/userRouter");
const sessionRouter = require("./routers/sessionRouter");
const payRouter = require("./routers/payRouter");


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use(mongo_sanitize());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/movie", movieRouter);
app.use("/cinema", cinemaRouter);
app.use("/user", userRouter);
app.use("/session", sessionRouter);
app.use("/pay", payRouter)

app.use(errorHandler);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find this URL on this server!`, 404));
});


module.exports = app;

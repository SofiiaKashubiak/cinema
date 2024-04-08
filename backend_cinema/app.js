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
const movieRouter = require("./routes/movieRouter");
const cinemaRouter = require("./routes/cinemaRouter");
const userRouter = require("./routes/userRouter");


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(morgan('dev'));
app.use(mongo_sanitize());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/movie", movieRouter);
app.use("/cinema", cinemaRouter);
app.use("/user", userRouter);

app.use(errorHandler);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find this URL on this server!`, 404));
});


module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');

var indexRouter = require("./routes/index");
var authenticationRouter = require("./routes/authentication");
var userRouter = require("./routes/user.route");
var restaurantRouter = require("./routes/restaurant.route");
var cartRouter = require("./routes/cart.route");
var orderRouter = require("./routes/order.route");
var foodRouter = require("./routes/food.route");
var bookmarkRouter = require("./routes/bookmark.route");
var qrpayment = require("./routes/payment");
const MongoDB = require("./services/mongodb.service");

MongoDB.connectToMongoDB();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("static"));
app.use(cors());

app.use("*", require("./services/authentication.service").tokenVerification);
app.use(
  "/refresh-token",
  require("./services/authentication.service").tokenRefresh
);
app.use("/", indexRouter);
app.use("/api", authenticationRouter);
app.use("/api/user", userRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/cart", cartRouter);
app.use("/api/food", foodRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", qrpayment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

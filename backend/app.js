var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const connectDB = require ('./config/database.js')
const dotenv = require("dotenv").config();


var productRouter = require('./routes/productRouter');
var userRouter = require('./routes/userRouter');
var orderRouter = require('./routes/orderRouter');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

connectDB()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal',(req,res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
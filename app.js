var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db connection

const db = require('./db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const authorRouter = require('./routes/author');

var app = express();

const accessToken = 'f447ab67c3b4b822ba3e4bd926baa26b';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next) {
//   const { accesstoken: token = null } = req.headers;
//   if(token && token === accessToken) next();
//   else res.status(401).json({ message: 'Unauthorized'});
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/author', authorRouter);


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

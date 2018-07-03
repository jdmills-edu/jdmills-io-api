var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const b = './routes/'
const routes = {
  index: require(b+`index`),
  devices: require(b+`devices`),
  homes: require(b+`homes`),
  institutions: require(b+`institutions`),
  persons: require(b+`persons`),
  fourOhFour: require(b+`404`)
}
var app = express();
mongoose.connect('mongodb://localhost/jdmills-io-api')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/devices', routes.devices);
app.use('/homes', routes.homes);
app.use('/institutions', routes.institutions);
app.use('/persons', routes.persons);
app.use('*', routes.fourOhFour);

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

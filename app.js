var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/tai-khoan');
var orderRouter = require('./routes/don-hang');
var categoryRouter = require('./routes/gian-hang');
var productRouter = require('./routes/san-pham');
var toptenRouter = require('./routes/top-10');
var soldRouter = require('./routes/doanh-so');
var loginRouter = require('./routes/dang-nhap');

var app = express();

mongoose.connect('mongodb+srv://customer:' + encodeURI('0766976947') + '@doanckweb-f3fht.mongodb.net/CustomerSite', { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log('Successfully connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tai-khoan', accountRouter);
app.use('/don-hang', orderRouter);
app.use('/gian-hang', categoryRouter);
app.use('/san-pham', productRouter);
app.use('/top-10', toptenRouter);
app.use('/doanh-so', soldRouter);
app.use('/dang-nhap', loginRouter);

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
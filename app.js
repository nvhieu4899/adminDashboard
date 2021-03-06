var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managerRouter = require('./routes/quan-li');
var soldRouter = require('./routes/doanh-so');
var loginRouter = require('./routes/loginRouter');
var passport = require('passport');
var ajaxRouter = require('./routes/ajax');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb+srv://admin:' + encodeURI('123123123') + '@doanckweb-f3fht.mongodb.net/CustomerSite', { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log('Successfully connected');
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 3 * 60 * 60 * 1000 } // 3 hours
}));

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 36000000 }));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', loginRouter);
app.use('/ajax', ajaxRouter);
app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/quan-li', managerRouter);
app.use('/doanh-so', soldRouter);

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
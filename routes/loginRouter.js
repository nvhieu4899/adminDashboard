var express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
var router = express.Router();
var passport = require('passport');


passport.initialize();
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!bcrypt.compareSync(password, user.password) || user.authen !== "1") { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Đăng nhập' });
});


router.post('/', passport.authenticate('local', { failureRedirect: '/' }),
    async(req, res) => {
        const finduser = User.findOne({ username: req.user.username });
        const usercallback = await finduser.exec();
        res.redirect('/home?username=' + req.user.username);
    });
module.exports = router;
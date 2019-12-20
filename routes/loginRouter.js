var express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Đăng nhập' });
});


router.post('/', passport.authenticate('local', { failureRedirect: '/' }),
    async(req, res) => {
        res.redirect('/home');
    });
module.exports = router;
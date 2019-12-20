var user = require('../models/user');
const passport = require('../passport/passport');

module.exports.login = async(req, res, next) => {
    res.redirect("/");
}

module.exports.loginDashBoard = async(req, res, next) => {
    res.render('login');
}

module.exports.logout = async(req, res, next) => {
    req.logout();
    res.redirect("/");
}

module.exports.homepageController = async(req, res, next) => {
    if (!req.user) this.login(req, res, next);
    else {
        res.render('index', { user: req.user });
    }
}
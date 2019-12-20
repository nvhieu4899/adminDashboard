var user = require('../models/user');
const passport = require('../passport/passport');
module.exports.login = async(req, res, next) => {

}
module.exports.homepageController = async(req, res, next) => {
    if (!req.user) res.redirect('/');
    else {



        res.render('index', { user: req.user });
    }
}
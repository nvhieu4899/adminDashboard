var user = require('../models/user');
var Product = require('../models/product');
var Category = require('../models/category');
var Order = require('../models/order');
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
        try {
            const count = await Product.getCountAll();
            const sold = await Product.getSoldAll();
            const order = await Order.getBuyAll();
            const usercount = await user.getAllUserCount()
            res.render('index', {
                users: usercount,
                price: order,
                count: count, 
                sold: sold, 
                user: req.user 
            });
        } catch (error) {
            next();
        }
        
    }
}
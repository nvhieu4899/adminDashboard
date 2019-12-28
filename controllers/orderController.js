var Order = require('../models/order');
const dashboardController = require('./dashboardControllers');

module.exports.getAllOrder = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const oders = await Order.getAllOrder();
            res.render('don-hang', { 
                title: 'Đơn hàng',
                user: req.user,
                order: oders
            });
        } catch (err) {
            next();
        }
    }
}
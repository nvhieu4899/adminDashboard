var User = require('../models/user');
var Order = require('../models/order');

const dashboardController = require('./dashboardControllers');

module.exports.getAllUserInfo = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const userinfo = await User.getAllUser();
            for (const item of userinfo)
            {
                if(item.id!=null)
                {
                    const buy = await Order.getBuy(item.id);
                    item.buy = buy;
                }
            };
            res.render('tai-khoan', {
                title: 'Quản lí các tài khoản',
                user: req.user,
                accounts: userinfo
            });
        } catch (err) {
            next();
        }
    }
}

module.exports.setAuth = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const userid = req.body.userid;
            const value = req.body.value;
            await User.setAuthen(userid, value);
        } catch (error) {
            next();
        }
    }
}
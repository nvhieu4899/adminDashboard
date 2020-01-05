var User = require('../models/user');
var Order = require('../models/order');
const PAGE_SIZE = 10;
const dashboardController = require('./dashboardControllers');

module.exports.getAllUserInfo = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const userinfo = await User.getUserAtPage(1, PAGE_SIZE);
            for (const item of userinfo) {
                if (item.id != null) {
                    if (item.authen == "1")
                        item.author = "Quản trị viên";
                    else
                    if (item.authen == "0") item.author = "Khách hàng";
                    else
                    if (item.authen == "2") item.author = "Tài khoản bị cấm";
                    else item.author = "Chưa phân quyền";
                    const buy = await Order.getBuy(item.id);
                    item.buy = buy;
                }
            };
            let count = await User.getAllUserCount();
            res.render('tai-khoan', {
                title: 'Quản lí các tài khoản',
                user: req.user,
                accounts: userinfo,
                pagination: {
                    page: 1,
                    pageCount: Math.ceil(count / PAGE_SIZE),
                    limit: 7
                }
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
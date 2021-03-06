const User = require('../models/user');
const PAGE_SIZE = 10;
const Handlebars = require('../helpers/handlebars');
const Product = require('../models/product');
module.exports.getAccountPage = async(req, res, next) => {
    let page = 1;
    if (req.query.p) page = req.query.p;
    let pageCount = Math.ceil(await User.getAllUserCount() / PAGE_SIZE);
    let account = await User.getUserAtPage(page, PAGE_SIZE);
    for (const item of account) {
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
    res.render('block-layout/account-block', {
        title: 'Quản lí các tài khoản',
        user: req.user,
        accounts: account,
        pagination: {
            page: page,
            pageCount: pageCount,
            limit: 7
        },
        layout: 'block-layout/account-block'
    }, (err, html) => {
        res.send(html);
    });
}

module.exports.filter = async(req, res, next) => {
    let products = await Product.filterAtPage(req.query);
    let offset = (req.query.p - 1) * PAGE_SIZE;
    res.render('block-layout/product-block', {
        prod: products.slice(offset, offset + 10),
        pagination: {
            page: req.query.p,
            pageCount: Math.ceil(products.length / PAGE_SIZE),
            limit: 7
        },
        layout: 'block-layout/product-block'
    }, (err, html) => {
        res.send(html);
    });
}
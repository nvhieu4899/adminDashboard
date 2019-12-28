var Product = require('../models/product');
var Category = require('../models/category');
const dashboardController = require('./dashboardControllers');

module.exports.getAllProductInfo = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const products = await Product.getAllProduct();
            for (const item of products)
            {
                if(item.id!=null)
                {
                    const catename = await Category.getCategoryName(item.category);
                    item.catename = catename;
                }
            };
            res.render('san-pham', {
                title: 'Sản phẩm',
                user: req.user,
                prod: products
            });
        } catch (err) {
            next();
        }
    }
}

module.exports.getTopProduct = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const products = await Product.getTopProduct();
            var j = 1;
            for (const item of products)
            {
                if(item.id!=null)
                {
                    const catename = await Category.getCategoryName(item.category);
                    item.catname = catename;
                    item.i = j;
                    j++;
                }
            };
            res.render('top-10', { 
                title: 'Top 10 sản phẩm',
                user: req.user,
                topproduct: products
            });
        } catch (err) {
            next();
        }
    }
}

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
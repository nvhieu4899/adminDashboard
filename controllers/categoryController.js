var Product = require('../models/product');
var Category = require('../models/category');
const dashboardController = require('./dashboardControllers');

module.exports.categoryCon = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const category = await Category.getAllCategories();
            for (const item of category) {
                if (item.id != null) {
                    const soluong = await Product.getCount(item.id);
                    const sold = await Product.getSold(item.id);
                    item.sl = soluong;
                    item.sold = sold;
                }
            };

            res.render('gian-hang', {
                title: 'Gian hàng',
                cate: category,
                user: req.user
            });
        } catch (err) {
            next();
        }
    }
}
module.exports.addCategoryController = async(req, res, next) => {

}
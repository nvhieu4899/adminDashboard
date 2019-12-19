var Product = require('../models/product');
var Category = require('../models/category');

module.exports.getAllProductInfo = async(req, res, next) => {
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
            prod: products
        });
    } catch (err) {
        next();
    }
}
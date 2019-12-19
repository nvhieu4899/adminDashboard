var Product = require('../models/product');
var Category = require('../models/category');

module.exports.categoryCon = async(req, res, next) => {
    try {
        const category = await Category.getAllCategories();
        for (const item of category)
        {
            if(item.id!=null){
            const soluong = await Product.getCont(item.id);
            const sold = await Product.getSold(item.id);
            item.sl = soluong;
            item.sold = sold;
            }
        };

        res.render('gian-hang', {
            title: 'Gian hàng',
            cate: category
        });
    } catch (err) {
        next();
    }
}
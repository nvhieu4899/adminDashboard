var mongoose = require('mongoose');
var product = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    rate: { type: Number, required: false },
    rateCount: { type: Number, required: false },
    sold: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    salePrice: { type: Number, required: false },
    unit: { type: String, required: false },
    category: { type: String, required: false }
});

var model = mongoose.model('Product', product, 'product');

module.exports.getAllProduct = async() => {
    return await model.find({});
};

module.exports.getCount = async(cateId) => {
    try {
        var count = 0;
        if (cateId == null) return 0;
        else count = await model.count({ category: cateId });
        return count;
    } catch (e) {
        return 0;
    }
};

module.exports.getSold = async(cateId) => {
    try {
        var sumsold = 0;
        if (cateId == null) return 0;
        else {
            const soldPro = await model.find({ category: cateId });
            for (const item of soldPro) {
                sumsold += item.sold;
            };
        }
        return sumsold;
    } catch (e) {
        return 0;
    }
};

module.exports.getSoldAll = async() => {
    try {
        var sumsold = 0;
        const soldPro = await model.find({});
        for (const item of soldPro) {
            sumsold += item.sold;
        };
        return sumsold;
    } catch (e) {
        return 0;
    }
};

module.exports.getCountAll = async() => {
    try {
        var count = 0;
        count = await model.count({});
        return count;
    } catch (e) {
        return 0;
    }
};

module.exports.getTopProduct = async() => {
    let pro = model.find({});
    pro = pro.sort({ sold: -1 });
    try {
        return await pro.limit(10);
    } catch (e) {
        return 0;
    }
};
module.exports.addNewProduct = async(name, desc, cate, qty, price, salePrice, unit, img) => {
    let product = new model({
        name: name,
        description: desc,
        price: price,
        available: qty,
        category: cate,
        img: img,
        unit: unit,
        salePrice: salePrice
    });
    try {
        await product.save();
        return true;
    } catch (err) {
        return false;
    }

}
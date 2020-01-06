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
module.exports.getProductsAtPage = async(pageIndex, pageSize) => {
    try {
        let product = await model.find({}).skip((pageIndex - 1) * pageSize).lean().limit(pageSize);
        return product;
    } catch (err) {
        return null;
    }
}
module.exports.filterAtPage = async(query) => {
    let minCost = query.minCost ? query.minCost : Number.MIN_SAFE_INTEGER;
    let maxCost = query.maxCost ? query.maxCost : Number.MAX_SAFE_INTEGER;
    let productQuery = model.find({ price: { $lte: maxCost, $gte: minCost } });
    if (query.category) productQuery = productQuery.where('category').equals(query.category);
    if (query.name) productQuery = productQuery.where('name').regex(query.name);
    let sortOrder = 1;
    if (query.order == 2) sortOrder = -1;

    switch (query.sortBy) {
        case '1':
            productQuery = productQuery.sort({ name: sortOrder });
            break;
        case '2':
            productQuery = productQuery.sort({ price: sortOrder });
            break;
        case '3':
            productQuery = productQuery.sort({ available: sortOrder });
            break;
        case '4':
            productQuery = productQuery.sort({ sold: sortOrder });
            break;
        default:
            break;
    }
    try {
        let products = await productQuery.lean().exec();
        return products;
    } catch {
        return null;
    }
}
module.exports.getProductById = async(productId) => {
    try {
        return await model.findById(productId);
    } catch (err) {
        return null;
    }
}
module.exports.updateProductInfo = async(id, name, cate, desc, qty, price, salePrice, unit) => {
    try {
        await model.findByIdAndUpdate(id, { name: name, category: cate, description: desc, available: qty, price: price, salePrice: salePrice, unit: unit });
        return true;
    } catch (err) {
        return false;
    }
}
module.exports.updateProductAvatar = async(id, avatar) => {
    if (!avatar) return false;
    try {
        await model.findByIdAndUpdate(id, { img: avatar });
        return true;
    } catch (err) {
        return false;
    }
}
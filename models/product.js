var mongoose = require('mongoose');
var product = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    rate: { type: Number, required: false },
    rateCount: { type: Number, required: false },
    sold: { type: Number, required: false },
    available: { type: Number, required: false },
    salePrice: { type: Number, required: false },
    category: { type: String, required: false }
});

var model = mongoose.model('Product', product, 'product');

module.exports.getAllProduct = async() => {
    return await model.find({});
};

module.exports.getCont = async(cateId) => {
    try {
        var count = 0;
        if (cateId==null) return 0;
        else count = await model.count({ category: cateId });
        return count;
    } catch (e) {
        return 0;
    }
};

module.exports.getSold = async(cateId) => {
    try {
        var sumsold = 0;
        if (cateId==null) return 0;
        else 
        {
            const soldPro = await model.find({ category: cateId });
            for (const item of soldPro)
            {
                sumsold+=item.sold;
            };
        }
        return sumsold;
    } catch (e) {
        return 0;
    }
};
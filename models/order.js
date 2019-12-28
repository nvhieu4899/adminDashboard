var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true}
});
var model = mongoose.model('Order', Order, 'orders');

module.exports.getBuy = async(userid) => {
    try {
        var buy = 0;
        const findOrder = await model.find({ user: userid});
        for (const item of findOrder)
        {
            buy += item.cart.totalPrice;
        }
        return buy;
    } catch (error) {
        return null;
    }
}

module.exports.getAllOrder = async() => {
    try {
        return await model.find({});
    } catch (error) {
        return null;
    }
}
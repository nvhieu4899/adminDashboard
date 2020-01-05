var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    cart: { type: Object, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, default: new Date() },
    status: { type: Number, default: 0 }
});
var model = mongoose.model('Order', Order, 'orders');

module.exports.getBuy = async(userid) => {
    try {
        var buy = 0;
        const findOrder = await model.find({ user: userid });
        for (const item of findOrder) {
            buy += item.cart.totalPrice;
        }
        return buy;
    } catch (error) {
        return null;
    }
}

module.exports.getBuyAll = async() => {
    try {
        var buy = 0;
        const Order = await model.find({});
        for (const item of Order) {
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

module.exports.setStt = async(orderid, value) => {
    try {
        await model.updateOne(
            {"_id" : orderid},
            {"$set": {"status": value}},
            function(err) {
                if (err) throw err;
            }
        )
        return true;
    } catch (err) {
        return false;
    }
    
}
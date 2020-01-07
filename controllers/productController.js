var Product = require('../models/product');
var Category = require('../models/category');
const dashboardController = require('./dashboardControllers');
const Resize = require('../upload/resize');
const path = require('path');
const sharp = require('sharp');
const cloudinary = require('../upload/cloudinary');
const PAGE_SIZE = 10;
module.exports.getAllProductInfo = async(req, res, next) => {
    if (!req.user) dashboardController.login(req, res, next);
    else {
        try {
            const products = await Product.getAllProduct();
            for (const item of products) {
                if (item.id != null) {
                    const catename = await Category.getCategoryName(item.category);
                    item.catename = catename;
                }
            };
            const categories = await Category.getAllCategories();
            res.render('san-pham', {
                title: 'Sản phẩm',
                user: req.user,
                prod: products.slice(0, 10),
                category: categories,
                pagination: {
                    page: 1,
                    pageCount: Math.ceil(products.length / PAGE_SIZE),
                    limit: 7
                }
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
            for (const item of products) {
                if (item.id != null) {
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
module.exports.addProductGetController = async(req, res, next) => {
    let categories = await Category.getAllCategories();
    res.render('add-product', { title: "Thêm sản phẩm", user: req.user, category: categories });
}
module.exports.addProduct = async(req, res, next) => {
    try {
        const imagePath = path.join(__dirname, '/public/images');
        const fileUpload = new Resize(imagePath);
        if (!req.file) {
            res.send("no image");
            return;
        }
        let buffer = await sharp(req.file.buffer).resize(1000, 800).jpeg().toBuffer();
        let base64 = buffer.toString('base64');

        base64 = "data:image/jpeg;base64," + base64;
        let json = await cloudinary.uploader.upload(base64);
        await Product.addNewProduct(req.body.name, req.body.description, req.body.category, req.body.quantity, req.body.price, req.body.salePrice, req.body.unit, json.url);
        res.redirect('/quan-li/san-pham');
    } catch (err) {
        res.send("failure");
    }
}
module.exports.getProductInfo = async(req, res, next) => {
    if (!req.user) {
        res.redirect('/');
        return;
    }
    let product = await Product.getProductById(req.query.id);
    let categories = await Category.getAllCategories();
    product.categoryName = await Category.getCategoryName(product.category);
    res.render('update-product-info', { title: 'Cập nhật sản phẩm', product: product, category: categories, user: req.user });
}
module.exports.updateProductInfo = async(req, res, next) => {
    if (!req.user) {
        res.redirect('/');
        return;
    }
    if (!req.body.id) next();
    await Product.updateProductInfo(req.body.id, req.body.name, req.body.category, req.body.description, req.body.quantity, req.body.price, req.body.salePrice, req.body.unit);
    if (req.file) {
        let buffer = await sharp(req.file.buffer).resize(1000, 800).jpeg().toBuffer();
        let base64 = buffer.toString('base64');
        base64 = "data:image/jpeg;base64," + base64;
        let json = await cloudinary.uploader.upload(base64);
        await Product.updateProductAvatar(req.body.id, json.url);
    }
    res.redirect('/quan-li/san-pham');
}
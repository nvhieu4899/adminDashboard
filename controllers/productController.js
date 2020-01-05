var Product = require('../models/product');
var Category = require('../models/category');
const dashboardController = require('./dashboardControllers');
const Resize = require('../upload/resize');
const express = require('express');
const path = require('path');
const imgur = require('../upload/imgur');

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
        let base64 = req.file.buffer.toString('base64');
        base64 = "data:image/jpeg;base64," + base64;
        await Product.addNewProduct(req.body.name, req.body.description, req.body.category, req.body.quantity, req.body.price, req.body.salePrice, req.body.unit, base64);
        res.redirect('/san-pham')
    } catch (err) {
        throw err;
        res.send("failure");
    }
}
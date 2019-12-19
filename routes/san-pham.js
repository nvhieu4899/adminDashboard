var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', async(req, res, next) => {
    productController.getAllProductInfo(req, res, next);
});

module.exports = router;
var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
var passport = require('../passport/passport');
const productController = require('../controllers/productController');
const upload = require('../upload/uploadMiddleware');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');

/* GET home page. */
router.get('/don-hang', async(req, res, next) => {
    orderController.getAllOrder(req, res, next);
});

router.post('/don-hang', async(req, res, next) => {
    orderController.setStt(req, res, next);
});

router.get('/san-pham', async(req, res, next) => {
    productController.getAllProductInfo(req, res, next);
});
router.get('/san-pham/add', async(req, res, next) => {
    productController.addProductGetController(req, res, next);
});


router.post('/san-pham/add', upload.single('image'), async(req, res, next) => {
    productController.addProduct(req, res, next);

})

router.get('/san-pham/update', (req, res, next) => {
    productController.getProductInfo(req, res, next);
})
router.post('/san-pham/update', upload.single('image'), (req, res, next) => {
    productController.updateProductInfo(req, res, next);
});

router.get('/tai-khoan', async(req, res, next) => {
    userController.getAllUserInfo(req, res, next);
});

router.post('/tai-khoan', async(req, res, next) => {
    userController.setAuth(req, res, next);
});

router.get('/gian-hang', async(req, res, next) => {
    categoryController.categoryCon(req, res, next);
});
router.get('/gian-hang/add', (req, res, next) => {
    res.render('')
})

module.exports = router;
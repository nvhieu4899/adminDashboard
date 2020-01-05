var express = require('express');
var router = express.Router();
var passport = require('../passport/passport');
const productController = require('../controllers/productController');
const upload = require('../upload/uploadMiddleware');


/* GET home page. */
router.get('/', async(req, res, next) => {
    productController.getAllProductInfo(req, res, next);
});
router.get('/add', async(req, res, next) => {
    productController.addProductGetController(req, res, next);
});


router.post('/add', upload.single('image'), async(req, res, next) => {
    productController.addProduct(req, res, next);

})
module.exports = router;
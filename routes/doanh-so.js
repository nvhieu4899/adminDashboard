var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('doanh-so', { title: 'Doanh số' , user: req.user});
});

router.get('/top-10', async(req, res, next) => {
    productController.getTopProduct(req, res, next);
});

module.exports = router;
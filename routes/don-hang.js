var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');


/* GET home page. */
router.get('/', async(req, res, next) => {
    orderController.getAllOrder(req, res, next);
});

router.post('/', async(req, res, next) => {
    orderController.setStt(req, res, next);
});
module.exports = router;
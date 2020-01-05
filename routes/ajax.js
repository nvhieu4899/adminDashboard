var express = require('express');
var router = express.Router();
const ajaxController = require('../controllers/ajaxController');

router.get('/tai-khoan', function(req, res, next) {
    ajaxController.getAccountPage(req, res, next);
});
router.get('/product', (req, res, next) => {
    ajaxController.filter(req, res, next);
});
module.exports = router;
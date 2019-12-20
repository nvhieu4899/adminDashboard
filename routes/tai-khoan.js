var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', async(req, res, next) => {
    userController.getAllUserInfo(req, res, next);
});

router.get('/', function(req, res, next) {
    res.render('tai-khoan', { title: 'Quản lí các tài khoản' });
});

module.exports = router;
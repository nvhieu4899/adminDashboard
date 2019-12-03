var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('tai-khoan', { title: 'Quản lí các tài khoản' });
});

module.exports = router;
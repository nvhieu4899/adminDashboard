var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('dang-nhap', { layout: false, title: 'Đăng nhập', error: "" });
});

module.exports = router;
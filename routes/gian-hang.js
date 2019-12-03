var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('gian-hang', { title: 'Gian hàng' });
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('top-10', { title: 'Top 10 sản phẩm' });
});

module.exports = router;
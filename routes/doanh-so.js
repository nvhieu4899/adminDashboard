var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('doanh-so', { title: 'Doanh số' });
});

module.exports = router;
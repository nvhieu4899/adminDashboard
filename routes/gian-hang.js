var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');


/* GET home page. */
router.get('/', async(req, res, next) => {
    categoryController.categoryCon(req, res, next);
});

module.exports = router;
var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');


/* GET home page. */
router.get('/', async(req, res, next) => {
    categoryController.categoryCon(req, res, next);
});
router.get('/add', (req, res, next) => {
    res.render('')
})
module.exports = router;
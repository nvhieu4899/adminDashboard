var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboardControllers');

/* GET home page. */
router.get('/', async(req, res, next) => {
    dashboardController.homepageController(req, res, next);
});

module.exports = router;
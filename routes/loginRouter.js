var express = require('express');
var router = express.Router();
var passport = require('../passport/passport');
const dashboardController = require('../controllers/dashboardControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    dashboardController.loginDashBoard(req, res, next);
});

router.post('/', passport.authenticate('local', { failureRedirect: '/' }),
    async(req, res, next) => {
        dashboardController.homepageController(req, res, next);
    });

router.get("/dang-xuat", async(req, res, next) => {
    dashboardController.logout(req, res, next);
});
module.exports = router;
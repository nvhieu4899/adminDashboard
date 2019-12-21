var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', async(req, res, next) => {
    userController.getAllUserInfo(req, res, next);
});

router.post('/', async(req, res, next) => {
    userController.setAuth(req, res, next);
});

module.exports = router;
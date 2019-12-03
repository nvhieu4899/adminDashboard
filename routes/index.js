var express = require('express');
var router = express.Router();
var user = require('../models/user');


/* GET home page. */
router.get('/', async(req, res, next) => {
    const userid = req.query.username;
    if (userid == null)
        res.redirect('/');
    else {
        const userfind = user.findOne({ username: userid });
        const userfound = await userfind.exec();
        if (userfound.authen === "1") res.render('index', { user: userfound, title: 'Bảng điều khiển' });
        else res.redirect('/');
    }
});

module.exports = router;
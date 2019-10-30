var express = require('express');
var router = express.Router();

function getCtrl4(req, res, next) {
    res.render('login');
}

function postCtrl4(req, res, next) {

    const loginData = req.body;
    let isOk = true;
    /* validation & logic about runner objects */
    if (loginData.name === "abc" && loginData.pass === "123") {
        req.session.xyz = true;
        req.session.rand = Math.random();
        req.session.username = req.body.username;
    } else {
        isOk = false;
    }
    /* end validation & logic about runner objects */
    if (isOk) {
        res.redirect('runner/list');
    } else {
        res.redirect('login');
    }
};

function getCtrlEnd(req, res, next) {
    req.session = null;
    res.render('login');
};

router.get('/', getCtrl4);
router.post('/', postCtrl4);
router.get('/end', getCtrlEnd);

module.exports = router;
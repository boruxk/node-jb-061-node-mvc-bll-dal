var express = require('express');
var router = express.Router();
const runnerbl = require('./runner-bl');

function getCtrl2(req, res, next) {
    runnerbl.getRunners(function (err, runnersData) {
        if (err) {
            res.render(`error: ${err}`);
        } else {
            if (res.locals.filtered && res.locals.filtered.length > 0) {
                res.render('runners', {
                    data: res.locals.filtered,
                    dataSelect: runnersData
                });
            } else {
                res.render('runners', {
                    data: runnersData,
                    dataSelect: runnersData
                });
            }
        }
    })
}

function postCtrl2(req, res, next) {
    const runner = {
        runnerId: req.body.id,
        runnerName: req.body.name,
        runnerKm: req.body.km
    }
    filterRunner(runner, (filtered) => {
        res.locals.filtered = filtered;
        return next();
    })
};

function filterRunner(runner, callback) {
    runnerbl.getRunners(function (err, runnersData) {
        if (err) {
            callback(`error: ${err}`);
        } else {
            if (runner.runnerId === "" && runner.runnerName === "" && runner.runnerKm === "") {
                callback(runnersData);
            }
            if (runner.runnerId) {
                const filteredById = runnersData.filter(i => i.id.toString() === runner.runnerId);
                callback(filteredById);
            }
            if (runner.runnerName) {
                const filteredByName = runnersData.filter(i => i.name === runner.runnerName);
                callback(filteredByName);
            }
            if (runner.runnerKm) {
                const filteredByKm = runnersData.filter(i => i.km.toString() === runner.runnerKm);
                callback(filteredByKm);
            }
        }
    })
}

function getCtrl(req, res, next) {
    res.render('add');
}

function postCtrl(req, res, next) {
    const runner = req.body;
    addRunner(runner, (added) => {
        return next();
    })
};

function addRunner(runner, callback) {
    let isOk = true;
    /* validation & logic about runner objects */
    if (runner.name.length < 2) {
        isOk = false;
    }
    /* end validation & logic about runner objects */
    if (isOk) {
        runnerbl.createRunner(runner, function (err, data) {
            callback('add', data);
        });
    } else {
        callback('error');
    }
}

function getCtrl3(req, res, next) {
    let id = req.params.id;
    runnerbl.getRunner(id, function (err, runnersData) {
        if (err) {
            res.render(`error: ${err}`);
        } else {
            res.render('runner', {
                dataOne: runnersData
            });
        }
    })
}

function getCtrl4(req, res, next) {
    res.render('login');
}

router.get('/list', getCtrl2);
router.post('/list', postCtrl2, getCtrl2);
router.get('/add', getCtrl);
router.post('/add', postCtrl, getCtrl2);
router.get('/:id', getCtrl3);
router.get('/login', getCtrl4);
module.exports = router;

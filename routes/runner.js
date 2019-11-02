var express = require('express');
var router = express.Router();
const runnerbl = require('./runner-bl');

function getRunnerList(req, res, next) {
    if (req.session.xyz !== true) {
        res.redirect('/login');
    } else {
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
}

function postRunnerList(req, res, next) {
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

function getAddRuunnerForm(req, res, next) {
    res.render('add');
}

function postAddRuunnerForm(req, res, next) {
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

function getSingleRunner(req, res, next) {
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

function postChosenOperation(req, res, next) {
    const id = req.body.id;
    const operation = req.body.op;
    const runner = req.body;

    switch (operation) {
        case 'update':
            res.redirect('/runner/update/' + id);
            break;
        case 'delete':
            deleteRunner(runner, (added) => {
                res.redirect('/runner/list');
            });
            break;
        default:
            res.redirect('/runner/list');
    }
}

function getEditRunnerForm(req, res) {
    const id = req.params.id;
    console.log(req.params);
    runnerbl.editRunner(id, function (err, runner) {
        res.render('edit', {
            runner: runner
        })
    })
}

function postUpdateRunner(req, res, next) {
    const runner = req.body;
    updateRunner(runner, (added) => {
        return next();
    })
};

function updateRunner(runner, callback) {
    let isOk = true;
    /* validation & logic about runner objects */
    if (runner.name.length < 2) {
        isOk = false;
    }
    /* end validation & logic about runner objects */
    if (isOk) {
        runnerbl.updateRunner(runner, function (err, data) {
            callback('add', data);
        });
    } else {
        callback('error');
    }
}

function deleteRunner(runner, callback) {
    runnerbl.deleteRunner(runner, function (err, data) {
        callback('add', data);
    });
}

router.get('/list', getRunnerList);
router.post('/list', postRunnerList, getRunnerList);
router.get('/add', getAddRuunnerForm);
router.post('/add', postAddRuunnerForm, getRunnerList);
router.post('/operation', postChosenOperation);
router.post('/update', postUpdateRunner, getRunnerList);
router.get('/update/:id', getEditRunnerForm);
router.get('/:id', getSingleRunner);

module.exports = router;
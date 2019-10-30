const dal = require('./dal');

function getRunner(id, callback) {
    dal.readOne(id, function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function getRunners(callback) {
    dal.readAll(function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function createRunner(runner, callback) {
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateF = `${year}-${month}-${day}`;
    runner.createdDate = dateF;
    dal.saveOne(runner, function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function updateRunner(runner, id, callback) {

}

function deleteRunner(runner) {

}

module.exports.getRunners = getRunners;
module.exports.getRunner = getRunner;
module.exports.createRunner = createRunner;
module.exports.updateRunner = updateRunner;
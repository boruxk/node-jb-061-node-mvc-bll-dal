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
    let hour = date.getHours();
    let min = date.getMinutes();
    let dateF = `${year}-${month}-${day} ${hour}:${min}`;
    runner.createdDate = dateF;
    dal.saveOne(runner, function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function updateRunner(id, callback) {
    dal.updateOne(id, function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function editRunner(runner, callback) {
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let dateF = `${year}-${month}-${day} ${hour}:${min}`;
    runner.updatedDate = dateF;
    dal.editOne(runner, function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function deleteRunner(runner) {

}

module.exports.getRunners = getRunners;
module.exports.getRunner = getRunner;
module.exports.createRunner = createRunner;
module.exports.updateRunner = updateRunner;
module.exports.editRunner = editRunner;
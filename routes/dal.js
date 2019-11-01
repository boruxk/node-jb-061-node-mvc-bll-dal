const fs = require('fs');

function readOne(id, callback) {
    const fileName = 'runner.txt';
    fs.readFile(fileName, (e, d) => {
        let data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        data = data.filter(runner => runner.id.toString() === id);
        let [dataOne] = data;
        callback(null, dataOne);
    });
}

function readAll(callback) {
    const fileName = 'runner.txt';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        callback(null, data);
    });
}

function saveOne(runner, callback) {
    const fileName = 'runner.txt';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        runner.id = data.length +1;
        data.push(runner);
        fs.writeFile(fileName, JSON.stringify(data), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }

        });
    });
}

function updateOne(id, callback) {
    const fileName = 'runner.txt';
    fs.readFile(fileName, (e, d) => {
        let data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        data = data.filter(runner => runner.id.toString() === id);
        let [dataOne] = data;
        callback(null, dataOne);
    });
}

function editOne(runner, callback) {
    const fileName = 'runner.txt';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const index = data.findIndex(({ id }) => id.toString() === runner.id);
        runner.createdDate = data[index].createdDate;
        data[index] = runner;
        fs.writeFile(fileName, JSON.stringify(data), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }

        });
    });
}

function deleteOne(runner, callback) {
    const fileName = 'runner.txt';
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const data2 = data.filter(({ id }) => id.toString() !== runner.id);
        fs.writeFile(fileName, JSON.stringify(data2), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }

        });
    });
}

module.exports.readAll = readAll;
module.exports.readOne = readOne;
module.exports.saveOne = saveOne;
module.exports.updateOne = updateOne;
module.exports.editOne = editOne;
module.exports.deleteOne = deleteOne;
const { readFile } = require('fs');
const fs = require('fs/promises');

const readContentFile = async () => fs.JSON.parse(await readFile('./talker.json'));

module.exports = {
    readContentFile,
};
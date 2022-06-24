const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('./talker.json'));

module.exports = {
    readContentFile,
};
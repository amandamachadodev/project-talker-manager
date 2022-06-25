const fs = require('fs/promises');

const writeContentFile = async (data) => {
  await fs.writeFile('./login.json', JSON.stringify(data));
};

const readContentFile = async () => JSON.parse(await fs.readFile('./talker.json'));

module.exports = {
    readContentFile,
    writeContentFile,
};
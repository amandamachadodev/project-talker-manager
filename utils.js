const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeContentFile = async (data) => {
  const login = await readContentFile();
  login.push(data);
  const loginToStr = JSON.stringify(login);
  await fs.writeFile('./login.json', loginToStr);
};

module.exports = {
    readContentFile,
    writeContentFile,
};
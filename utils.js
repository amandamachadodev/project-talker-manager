const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('./talker.json'));

const writeContentFile = async (data) => {
  const login = await readContentFile();
  login.push(data);
  const loginToStr = JSON.stringify(login);
  await fs.writeFile('./login.json', loginToStr);
};

const writeTalkerFile = async (talk) => {
  const talker = await readContentFile();
  talker.push(talk);
  const talkerToStr = JSON.stringify(talker);
  await fs.writeFile('./talker.json', talkerToStr);
};

module.exports = {
    readContentFile,
    writeContentFile,
    writeTalkerFile,
};
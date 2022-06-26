const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readContentFile, writeContentFile } = require('./utils');
const { isValidEmail } = require('./middlewares/validateEmail');
const { isValidPassword } = require('./middlewares/validatePassword');
const { isValidToken } = require('./middlewares/validateToken');
const { isValidName } = require('./middlewares/validateName');
const { isValidAge } = require('./middlewares/validateAge');
const { isValidTalk } = require('./middlewares/validateTalk');
const { isValidWatchedAt } = require('./middlewares/validadeWatchedAt');
const { isValidRate } = require('./middlewares/validateRate');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await readContentFile('./talker.json');
  if (!talker.length) return res.status(200).json([]);
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readContentFile('./talker.json');
  const data = talker.find((r) => r.id === Number(id));
  if (!data) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  return res.status(200).json(data);
});

app.post('/login', isValidEmail, isValidPassword, async (req, res) => {
  const { email, password } = req.body;
  await writeContentFile('./login.json', { email, password });
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker', isValidToken, isValidName, isValidAge, isValidTalk, isValidWatchedAt,
  isValidRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = readContentFile('/talker.json');
  if (talker) {
    const newTalker = { id: talker.length + 1, name, age, talk };
    await writeContentFile('./talker.json', newTalker);
    return res.status(201).json(newTalker);
  }
});

app.listen(PORT, () => {
console.log('Online');
});

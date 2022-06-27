const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { writeContentFile, readContentFile } = require('./utils');
const { isValidEmail } = require('./middlewares/validateEmail');
const { isValidPassword } = require('./middlewares/validatePassword');
const { isValidToken } = require('./middlewares/validateToken');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const fileTalker = './talker.json';
app.get('/talker/search', async (req, res) => {
  const { searchTerm } = req.query;
  const talker = await readContentFile(fileTalker);
  const talkerName = talker.filter((e) => e.name.includes(searchTerm));
  if (searchTerm.length === 0 || searchTerm === undefined) return res.status(200).json(talker);
  if (!talkerName) return res.status(200).json([]);
  return res.status(200).json(talkerName);
});

app.get('/talker', async (_req, res) => {
  const talker = await readContentFile(fileTalker);
  if (!talker.length) return res.status(200).json([]);
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readContentFile(fileTalker);
  const data = talker.find((e) => e.id === Number(id));
  if (!data) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  return res.status(200).json(data);
});

app.post('/login', isValidEmail, isValidPassword, async (req, res) => {
  const { email, password } = req.body;
  const arrContent = await readContentFile('.login.json') || [];
  arrContent.push({ email, password });
  await writeContentFile('./login.json', arrContent);
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.use(isValidToken);

const talkerRouter = require('./router/talkerRouter');

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
console.log('Online');
});

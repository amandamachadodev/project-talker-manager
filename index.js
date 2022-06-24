const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readContentFile } = require('./utils');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await readContentFile();
  if (!talker.length) return res.status(200).json([]);
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readContentFile();
  const data = talker.find((r) => r.id === Number(id));
  if (!data) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  return res.status(200).json(data);
});

app.post('/login',
(req, res) => {
  try {
  const { email, password } = req.body;

  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'missing fields' });
  }

  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
} catch (error) {
  return res.status(500).end();
}
});

app.listen(PORT, () => {
console.log('Online');
});

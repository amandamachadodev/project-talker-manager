const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile } = require('./fs-utils');

const app = express();
app.use(bodyParser.json());
app.listen(3000, () => console.log('ouvindo na porta 3000!'));
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

app.listen(PORT, () => {
  console.log('Online');
});

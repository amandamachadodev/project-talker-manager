const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { writeContentFile } = require('./utils');
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

app.post('/login', isValidEmail, isValidPassword, async (req, res) => {
  const { email, password } = req.body;
  await writeContentFile('./login.json', { email, password });
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.use(isValidToken);

const talkerRouter = require('./router/talkerRouter');

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
console.log('Online');
});

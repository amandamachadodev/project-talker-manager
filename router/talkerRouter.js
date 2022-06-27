const express = require('express');

const router = express.Router();
const { writeContentFile, readContentFile } = require('../utils');
const { isValidName } = require('../middlewares/validateName');
const { isValidAge } = require('../middlewares/validateAge');
const { isValidTalk } = require('../middlewares/validateTalk');
const { isValidWatchedAt } = require('../middlewares/validadeWatchedAt');
const { isValidRate } = require('../middlewares/validateRate');

const fileTalker = './talker.json';

router.post('/', isValidName, isValidAge, isValidTalk, isValidWatchedAt,
  isValidRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await readContentFile(fileTalker);
  const newTalker = { id: talker.length + 1, name, age, talk };
  await writeContentFile(fileTalker, newTalker);
  return res.status(201).json(newTalker);
});

router.put('/:id', isValidName, isValidAge, isValidTalk, isValidWatchedAt,
isValidRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await readContentFile(fileTalker);
  const talkerId = talker.findIndex((e) => e.id === +id);

  if (!talkerId) {
    return res.status(404).json({
       message: 'Pessoa palestrante não encontrada',
     }); 
  }
  const editTalker = { id, name, age, talk };
  await writeContentFile(fileTalker, editTalker);
  return res.status(200).json(editTalker);
});

module.exports = router;
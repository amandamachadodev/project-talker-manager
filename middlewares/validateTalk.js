const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
      
  if (
    talk === undefined 
    || talk.length === 0
  ) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    
  next();
};
  
module.exports = { isValidTalk };
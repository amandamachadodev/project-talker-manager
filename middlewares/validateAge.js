const isValidAge = (req, res, next) => {
  const { age } = req.body;
      
  if (
    age === undefined 
    || age.length === 0
  ) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (
    age.length < 18
  ) return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    
  next();
};
  
module.exports = { isValidAge };
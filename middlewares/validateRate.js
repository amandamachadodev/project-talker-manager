const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
          
  if (
    rate === undefined 
    || rate.length === 0
  ) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
      
  if (!Number.isInteger(rate) < 1 || !Number.isInteger(rate) > 5) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }
        
  next();
};
  
module.exports = { isValidRate };
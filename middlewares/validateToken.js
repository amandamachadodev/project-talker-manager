const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token.find((e) => e !== token)) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!token || token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  next();
};
  
module.exports = { isValidToken };
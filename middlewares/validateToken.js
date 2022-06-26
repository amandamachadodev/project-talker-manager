const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);
  if (!tokenRegex.test(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  next();
};
  
module.exports = { isValidToken };
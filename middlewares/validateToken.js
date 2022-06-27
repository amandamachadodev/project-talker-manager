const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (authorization === undefined 
    || authorization.length === 0) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);
  if (!tokenRegex.test(authorization)) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  next();
};
  
module.exports = { isValidToken };
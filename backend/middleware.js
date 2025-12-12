const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token required' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role_id !== 1) return res.status(403).json({ error: 'Tik admin gali atlikti šią veiksmą' });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Neteisingas token' });
  }
}

module.exports = { authenticateAdmin };

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.userId = decoded.id;
    next();
  });
};

exports.authenticate = authenticate;

const express = require('express');
const { Parser } = require('json2csv');
const TimeEntry = require('../dbModels/TimeEntry');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization.split(' ')[1];
//   jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
//     if (err) return res.status(401).send('Unauthorized');
//     req.userId = decoded.id;
//     next();
//   });
// };

router.get('/csv', authenticate, async (req, res) => {
  try {
    const entries = await TimeEntry.find({ userId: req.userId });
    const fields = ['type', 'timestamp', 'note'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(entries);
    res.header('Content-Type', 'text/csv');
    res.attachment('entries.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

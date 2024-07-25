const express = require('express');
const TimeEntry = require('../dbModels/TimeEntry');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.userId = decoded.id;
    next();
  });
};

router.post('/', authenticate, async (req, res) => {
  const { type, note } = req.body;
  try {
    const entry = new TimeEntry({ userId: req.userId, type, note });
    await entry.save();
    res.status(201).send(entry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const entries = await TimeEntry.find({ userId: req.userId });
    res.send(entries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

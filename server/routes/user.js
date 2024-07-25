const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../dbModels/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    const response = await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', {
      expiresIn: '1h',
    });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

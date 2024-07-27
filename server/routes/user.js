const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../dbModels/User'); // Adjust the path as needed
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.userId = decoded.id;
    next();
  });
};

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  'mongodb+srv://maorkab:wWUveX1naIKmrWJO@cluster-time-clock.mwzcrep.mongodb.net/time-clock-DB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userRoutes = require('./routes/user');
const timeEntryRoutes = require('./routes/timeEntry');
const exportRoutes = require('./routes/export');

app.get('/health', (req, res) => {
  res.send('Welcome to the Time Clock API');
});

app.use('/api/users', userRoutes);
app.use('/api/time-entries', timeEntryRoutes);
app.use('/api/export', exportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

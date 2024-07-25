const mongoose = require('mongoose');

const timeEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['entry', 'break', 'exit'], required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String },
});

module.exports = mongoose.model('TimeEntry', timeEntrySchema);
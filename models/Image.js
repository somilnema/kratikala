const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: String,
  url: String, // Store image URL or path
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);
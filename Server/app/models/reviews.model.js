const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  author: String,
  title: String,
  content: String,
  date: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  locationId: { type: String, required: true },
  author: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

mongoose.model('Review', reviewSchema);

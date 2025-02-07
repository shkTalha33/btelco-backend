const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },  
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  service: {
    type: String,
    required: true,
    // enum: ["Web Development", "SEO Optimization", "Graphic Design", "Marketing", "Other"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quote = mongoose.model("Quote", QuoteSchema);

module.exports = Quote;

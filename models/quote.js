const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{10,15}$/, // Ensures only numbers and a valid length
  },
  preferredContact: {
    type: [String], // Array to allow multiple selections
    required: true,
    enum: ["phone", "email"], // Ensures only valid values are stored
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  service: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quote = mongoose.model("Quote", QuoteSchema);

module.exports = Quote;

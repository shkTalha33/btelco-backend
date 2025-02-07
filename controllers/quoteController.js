const Quote = require("../models/quote");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Handle form submission
const submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, message, service } = req.body;
    // Save form data to the database
    const newQuote = new Quote({ firstName, lastName, email, message, service });
    await newQuote.save();
    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // Email content
    let mailOptions = {
      from: email,
      to:  process.env.EMAIL, // Send confirmation to the user
      subject: "Quote Request Received",
      html: `<h2>Thank you for reaching out!</h2>
             <p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Service Requested:</strong> ${service}</p>
             <p><strong>Message:</strong> ${message}</p>
             <p>We will get back to you soon.</p>`,
    };
    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Form submitted successfully! Email sent.", data: newQuote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all quotes
const getQuote = async (req, res) => {
  try {
    const quote = await Quote.find();
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitForm, getQuote };

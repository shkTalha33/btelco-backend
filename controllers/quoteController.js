const Quote = require("../models/quote");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Handle form submission
const submitForm = async (req, res) => {
  try {
      // Extract form data
      const { firstName, lastName, email, message, service } = req.body;

      // Basic validation
      if (!firstName || !lastName || !email || !message || !service) {
          return res.status(400).json({
              success: false,
              message: 'All fields are required'
          });
      }

      // Save to database
      const newQuote = new Quote({
          firstName,
          lastName,
          email: email.toLowerCase(),
          message,
          service
      });
      await newQuote.save();

      // Configure email transport
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      });

      // Admin notification email
      const adminMailOptions = {
          from: email,
          to: process.env.EMAIL,
          subject: `New Quote Request - ${service}`,
          html: `
              <div style="font-family: Arial, sans-serif;">
                  <h2>New Quote Request</h2>
                  <div style="background-color: #f5f5f5; padding: 20px;">
                      <h3>Client Details:</h3>
                      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Service:</strong> ${service}</p>
                      <div style="margin-top: 20px;">
                          <h3>Message:</h3>
                          <p>${message}</p>
                      </div>
                  </div>
              </div>
          `
      };

      // Client confirmation email
      const clientMailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'Quote Request Received',
          html: `
              <div style="font-family: Arial, sans-serif;">
                  <h2>Thank You for Your Quote Request</h2>
                  <p>Dear ${firstName},</p>
                  <p>We have received your quote request for ${service}. 
                     Our team will review your request and get back to you shortly.</p>
                  <p>Best regards,<br>B-Telco</p>
              </div>
          `
      };

      // Send emails
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(clientMailOptions);

      // Send success response
      return res.status(201).json({
          success: true,
          message: 'Quote request submitted successfully',
          data: newQuote
      });

  } catch (error) {
      console.error('Form submission error:', error);
      return res.status(500).json({
          success: false,
          message: 'Error processing your request'
      });
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

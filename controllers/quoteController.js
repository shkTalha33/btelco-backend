const Quote = require("../models/quote");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Handle form submission
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465, // or 587 if using TLS
  secure: true, // true for SSL (465), false for TLS (587)
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

console.log("ZOHO_EMAIL", process.env.ZOHO_EMAIL)
console.log("ZOHO_PASSWORD", process.env.ZOHO_PASSWORD)

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Connected Successfully");
  }
});

const submitForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      preferredContact,
      message,
      service,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !preferredContact || !message || !service) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newQuote = new Quote({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      preferredContact,
      message,
      service,
    });
    await newQuote.save();

    const adminMailOptions = {
      from: process.env.ZOHO_EMAIL, // Ensure emails are sent from your Zoho email
      to: process.env.ZOHO_EMAIL, // Admin email
      subject: `New Quote Request - ${service}`,
      html: `
          <div style="font-family: Arial, sans-serif;">
              <h2>New Quote Request</h2>
              <div style="background-color: #f5f5f5; padding: 20px;">
                  <h3>Client Details:</h3>
                  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Preferred Contact:</strong> ${preferredContact.join(", ")}</p>
                  <p><strong>Service:</strong> ${service}</p>
                  <div style="margin-top: 20px;">
                      <h3>Message:</h3>
                      <p>${message}</p>
                  </div>
              </div>
          </div>
      `,
    };

    const clientMailOptions = {
      from: process.env.ZOHO_EMAIL,
      to: email,
      subject: "Quote Request Received",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
              <div style="margin-bottom: 20px; text-align: center;">
                  <img 
                      src="https://res.cloudinary.com/dj6wp353y/image/upload/v1738922829/hgtposci1rpm2tmmkx9d.png" 
                      alt="B-TELCO Official Logo" 
                      style="width: 120px; height: auto; margin-bottom: 10px;"
                  />
              </div>

              <div style="text-align: left; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                  <h2 style="color: #2B0E61; margin-bottom: 20px;">Thank You for Your Quote Request</h2>
                  <p style="margin-bottom: 15px;">Dear ${firstName},</p>
                  <p style="margin-bottom: 20px; line-height: 1.5;">
                     Thank you for reaching out to us and submitting your quote request. We have received your details and will review them promptly.
                  </p>
                  <p style="margin-bottom: 20px; line-height: 1.5;">
                    A member of our team will be in touch soon via your preferred method of contact  to discuss your requirements further.
                  </p>
                  <p style="margin-bottom: 20px; line-height: 1.5;">
                    We appreciate the opportunity to assist you and look forward to providing you with the best possible service.
                  </p>
                  <p style="margin-top: 30px;">
                      Best regards,<br>
                      <strong>B-TELCO Team</strong>
                  </p>
              </div>

              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                  <p>© ${new Date().getFullYear()} B-TELCO. All rights reserved.</p>
              </div>
          </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: newQuote,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing your request",
    });
  }
};
const getQuote = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitForm, getQuote };

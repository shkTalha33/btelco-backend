const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI,);

const setupAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const password = "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = await Admin.findOne({ email });

    if (!admin) {
      admin = new Admin({ email, password: hashedPassword });
      await admin.save();
    } else {
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error setting up admin:", error);
    mongoose.connection.close();
  }
};

setupAdmin();

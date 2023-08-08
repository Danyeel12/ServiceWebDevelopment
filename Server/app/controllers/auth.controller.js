const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

// User registration
exports.register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Validate request
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword, // Hash the password before storing it
    });

    // Save the user to the database
    await newUser.save();

    return res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error registering user." });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the password is valid
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours in seconds
    });

    // Return token to the client
    return res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in." });
  }
};

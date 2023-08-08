
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

// Get user profile
exports.getProfile = (req, res) => {
  // Find the user by ID and exclude the password field
  User.findById(req.userId, { password: 0 })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res.json(user);
    });
};

// Update user profile
exports.updateProfile = (req, res) => {
  const { fname, lname, email } = req.body;

  // Validate request
  if (!fname || !lname || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Find the user by ID and update the profile
  User.findByIdAndUpdate(
    req.userId,
    { fname, lname, email },
    { new: true }
  )
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res.json({ message: "Profile updated successfully!" });
    });
};

// Delete user account
exports.deleteAccount = (req, res) => {
  // Find the user by ID and delete the account
  User.findByIdAndRemove(req.userId)
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      return res.json({ message: "Account deleted successfully!" });
    });
};

// User registration
exports.register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Validate first name, last name, email, and password
    if (!fname || fname.trim().length === 0) {
      return res.status(400).send("Invalid first name");
    }

    if (!lname || lname.trim().length === 0) {
      return res.status(400).send("Invalid last name");
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      return res.status(400).send("Invalid email");
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Invalid password, password must be at least 6 characters long");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    console.log("User registered successfully:", newUser);

    return res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error registering user." });
  }
  
};
// User login
exports.login = async (req, res) => {
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
bcrypt.compare(password, user.password, (err, result) => {
  if (err) {
    return res.status(500).json({ message: "An error occurred." });
  }

  if (!result) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 86400, // 24 hours in seconds
  });

  // Return token and user info to the client
  res.status(200).json({
    id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    accessToken: token,
  });
});
}

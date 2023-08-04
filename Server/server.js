const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const dbConfig = require('./db.config'); // import db config
const User = require('./user.model'); // import User model
const Role = db.role;
const bcrypt = require('bcryptjs');

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = {
origin: ["http://localhost:8081"],
credentials: true}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "default-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
  
)
app.use(
  cors({
  credentials: true,
  origin: ["http://localhost:8081"],
  })
  );
  
app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Spider Web Dev." });
});

// Import the Contact model
const Contact = require("./app/models/contact.model.js");

app.post("/api/contact", (req, res) => {
  const contactData = req.body;

  // Create a new Contact model instance using the data received from the frontend
  const contact = new Contact({
    first: contactData.firstName,
    last: contactData.lastName,
    email: contactData.email,
    phone: contactData.phone,
    title: contactData.inquiryTitle,
    type: contactData.inquiryType,
    budget: contactData.budget,
    message: contactData.message,
  });

  // Save the contact data to the database
  contact
    .save()
    .then(savedContact => {
      console.log("Contact data saved to MongoDB:", savedContact);
      res.json({ message: "Contact form data saved successfully." });
    })
    .catch(error => {
      console.error("Error saving contact data:", error);
      res.status(500).json({ message: "Error saving contact form data." });
    });
});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email
  if (!email || !email.includes("@") || !email.includes(".")) {
    return res.status(400).send("Invalid email");
  }

  // Validate password
  if (!password || password.length < 6) {
    return res.status(400).send("Invalid password, password must be at least 6 characters long");
  }

  // find the user
  const user = await User.findOne({ email });

  // user not found
  if (!user) return res.status(404).send('User not found');

  // check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

  // if user is found and password is valid, create a token
  const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 }); // expires in 24 hours

  res.status(200).send({ auth: true, token: token });
});
app.post('/api/register', async (req, res) => {
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
    return res.status(400).send("Invalid password, password must be at least 6 characters long");
  }

  // find the user
  const userExists = await User.findOne({ email });

  // user already exists
  if (userExists) return res.status(400).send('User already exists');

  // hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // create a new user
  const newUser = new User({
    fname,
    lname,
    email,
    password: hashedPassword,
  });

  // save the user
  newUser
    .save()
    .then(savedUser => {
      console.log("User saved to MongoDB:", savedUser);
      res.json({ message: "User registered successfully." });
    })
    .catch(error => {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Error registering user." });
    });
});



const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

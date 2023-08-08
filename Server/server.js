const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require("./app/config/auth.config");
const path = require('path');
const User = require("./app/models/user.model");
const authJwt = require("./app/models/auth.middleware.js");
const Role = db.role;
const bcrypt = require('bcryptjs');
const router = express.Router();
const authRoutes = require("./app/routes/user.routes");
const Review = require("./app/models/reviews.model.js");
const reviewsRoutes = require("./app/routes/reviews.routes");
const authController = require("./app/controllers/auth.controller");

db.mongoose
  .connect(db.url, {
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
  origin: ["http://localhost:4200"],
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", reviewsRoutes);

app.use(
  cookieSession({
    name: "default-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Spider Web Dev." });
});

const Contact = require("./app/models/contact.model.js");

app.post("/api/contact", (req, res) => {
  const contactData = req.body;
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

app.use("/user", authRoutes);
//app.use("/user", authJwt.verifyToken, userRoutes);
app.post("/api/register", authRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

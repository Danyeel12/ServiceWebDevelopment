const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

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

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

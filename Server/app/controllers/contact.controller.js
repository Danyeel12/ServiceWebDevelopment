const db = require("../models");
const Contact = db.contact;

// Create and Save a new Product
exports.create = (req, res) => {
      // Validate request

  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

  // Create a Contact

  const contact = new Contact({

    first: req.body.first,

      last: req.body.last,

      email: req.body.email,

      phone: req.body.phone,

      title: req.body.title,

      type: req.body.type,

      budget: req.body.budget,

      message: req.body.message,
  });

  // Save Product in the database

  Contact.create(contact)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while creating the contact information."

      });

    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
 
    Contact.find(condition)
  
      .then(data => {
  
        res.send(data);
  
      })
  
      .catch(err => {
  
        res.status(500).send({
  
          message:
  
            err.message || "Some error occurred while retrieving contact."
  
        });
  
      });
};
// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contact.findById(id)
  
      .then(data => {
  
        if (!data)
  
          res.status(404).send({ message: "Not found contact with id" + id });
  
        else res.send(data);
  
      })
  
      .catch(err => {
  
        res
  
          .status(500)
  
          .send({ message: "Error retrieving contact with id=" + id });
  
      });
};
// Update a Product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {

        return res.status(400).send({
    
          message: "Data to update can not be empty!"
    
        });
    
      }

      const id = req.params.id;
    
      Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    
        .then(data => {
    
          if (!data) {
    
            res.status(404).send({
    
              message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
    
            });
    
          } else res.send({ message: "Contact was updated successfully." });
    
        })
    
        .catch(err => {
    
          res.status(500).send({
    
            message: "Error updating Contact with id=" + id
    
          });
    
        });
};
// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.findByIdAndRemove(id)
  
      .then(data => {
  
        if (!data) {
  
          res.status(404).send({
  
            message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
  
          });
  
        } else {
  
          res.send({
  
            message: "Contact was deleted successfully!"
  
          });
  
        }
  
      })
  
      .catch(err => {
  
        res.status(500).send({
  
          message: "Could not delete Contact with id=" + id
  
        });
  
      });
};
// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Contact.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Contact were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all Contact."

      });

    });
};
// Find all published Products
exports.findAllPublished = (req, res) => {
    Contact.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving Contact."

      });

    });
};
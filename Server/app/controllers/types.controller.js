const db = require("../models");
const Type = db.types;

// Create and Save a new Categories

exports.create = (req, res) => {

  // Validate request

  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

  // Create a Categories

  const types = new Type({

    name: req.body.name,

  });

  // Save Categories in the database

  Type

    .save(type)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while creating the service."

      });

    });

};

// Retrieve all Categories from the database.

exports.findAll = (req, res) => {

   const name = req.query.name;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Type.find(condition)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving services."

      });

    });
};

// Find a single Categories with an id

exports.findOne = (req, res) => {

  const id = req.params.id;

  Type.findById(id)

    .then(data => {

      if (!data)

        res.status(404).send({ message: "Not found services with id " + id });

      else res.send(data);

    })

    .catch(err => {

      res

        .status(500)

        .send({ message: "Error retrieving Service with id=" + id });

    });
};

// Update a Categories by the id in the request

exports.update = (req, res) => {

  if (!req.body) {

    return res.status(400).send({

      message: "Data to update can not be empty!"

    });

  }

  const id = req.params.id;

  Type.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot update Service with id=${id}. Maybe Services was not found!`

        });

      } else res.send({ message: "Service was updated successfully." });

    })

    .catch(err => {

      res.status(500).send({

        message: "Error updating Service with id=" + id

      });

    });
};

// Delete a Categories with the specified id in the request

exports.delete = (req, res) => {

  const id = req.params.id;

  Type.findByIdAndRemove(id)

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot delete Service with id=${id}. Maybe Service was not found!`

        });

      } else {

        res.send({

          message: "Service was deleted successfully!"

        });

      }

    })

    .catch(err => {

      res.status(500).send({

        message: "Could not delete Service with id=" + id

      });

    });

};

// Delete all Categories from the database.

exports.deleteAll = (req, res) => {

   Type.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Services were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all services."

      });

    });
};

// Find all published Categories

exports.findAllPublished = (req, res) => {

   Type.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving services."

      });

    });
};
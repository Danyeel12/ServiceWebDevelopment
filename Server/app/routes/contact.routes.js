module.exports = app => {

    const contact = require("../controllers/contact.controller.js"); 
    var router = require("express").Router();

    // Create a new Product
    router.post("/", contact.create);

    // Retrieve all Products
    router.get("/", contact.findAll);

    // Retrieve a single Product with id
    router.get("/:id", contact.findOne);

    // Update a Product with id
    router.put("/:id", contact.update);

    // Delete a Product with id
    router.delete("/:id", contact.delete);

    // Delete all Products
    router.delete("/", contact.deleteAll);

    app.use('/api/contact', router);
  
};
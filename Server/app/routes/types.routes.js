module.exports = app => {

    const type = require("../controllers/types.controller.js");

    var router = require("express").Router();

    // Create a new Product
    router.post("/", type.create);

    // Retrieve all Products
    router.get("/", type.findAll);

    // Retrieve a single Product with id
    router.get("/:id", type.findOne);

    // Update a Product with id
    router.put("/:id", type.update);

    // Delete a Product with id
    router.delete("/:id", type.delete);

    // Delete all Products
    router.delete("/", type.deleteAll);

    app.use('/api/type', router);
  
};
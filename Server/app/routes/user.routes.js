
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
//const authJwt = require("../models/auth.middleware.js");

// Define routes
router.post("/register", authController.register);
router.post("/login", authController.login); // adding log in
//router.get("/profile", authJwt.verifyToken, userController.getProfile);
//router.put("/profile", authJwt.verifyToken, userController.updateProfile);
//router.delete("/account", authJwt.verifyToken, userController.deleteAccount);

module.exports = router;


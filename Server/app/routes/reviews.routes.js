const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews.controller.js");

// Get reviews
router.get("/reviews", reviewsController.getReviews);

// Post a review
router.post("/reviews", reviewsController.createReview);

// Update a review
router.put('/reviews/:author', reviewsController.updateReview);

// Delete a review
router.delete('/reviews/:author', reviewsController.deleteReviewByAuthor);

module.exports = router;

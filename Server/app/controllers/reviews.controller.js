const Review = require("../models/reviews.model.js");

// Get reviews
exports.getReviews = (req, res) => {
  const page = req.query.page || 1;
  const limit = 10; // Number of reviews per page
  const skip = (page - 1) * limit;

  Review.find()
    .sort({ date: -1 }) // Sort reviews by date in descending order
    .skip(skip)
    .limit(limit)
    .then(reviews => res.json(reviews))
    .catch(error => {
      console.error("Error getting reviews:", error);
      res.status(500).json({ message: "Error getting reviews." });
    });
};

// Post a review
exports.createReview = (req, res) => {
  const reviewData = req.body;

  const review = new Review({
    author: reviewData.author,
    title: reviewData.title,
    content: reviewData.content,
    date: new Date(), 
  });

  review
    .save()
    .then(savedReview => {
      console.log("Review saved to MongoDB:", savedReview);
      res.json(savedReview); // Send the saved review back in the response
    })
    .catch(error => {
      console.error("Error saving review:", error);
      res.status(500).json({ message: "Error saving review." });
    });
};

// Update a review
exports.updateReview = (req, res) => {
  const { author } = req.params;
  const reviewData = req.body;

  Review.findOneAndUpdate(
    { author },
    {
      title: reviewData.title,
      content: reviewData.content,
    },
    { new: true }
  )
    .then(updatedReview => {
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      console.log("Review updated:", updatedReview);
      res.json(updatedReview);
    })
    .catch(error => {
      console.error("Error updating review:", error);
      res.status(500).json({ message: "Error updating review." });
    });
};

// reviews.controller.js
exports.deleteReviewByAuthor = (req, res) => {
  const { author } = req.params;

  Review.deleteMany({ author })  // Use deleteMany to delete all matching documents
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Review not found' });
      }
      console.log('Review deleted:', result);
      res.json({ message: 'Review deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Error deleting review.' });
    });
};

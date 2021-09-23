const express = require("express");
const reviewRouter = express.Router();

const { createReview, getAllReviews, getPlanReviews, top3reviews, rateAReview, updateReview, deleteReviewww } = require("../controller/reviewController");
reviewRouter.route("").post(createReview).get(getAllReviews).delete(deleteReviewww);
reviewRouter.route("/:id").get(getPlanReviews);
reviewRouter.route("/top3reviews").get(top3reviews);
reviewRouter.route("/rateAReview").post(rateAReview);
reviewRouter.route("/update/:id").get(updateReview);
module.exports = reviewRouter;
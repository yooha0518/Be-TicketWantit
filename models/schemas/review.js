const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewId = require("./types/short-id");

const reviewSchema = new Schema({
  reviewId,
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  reviewContent: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reviewSchema;

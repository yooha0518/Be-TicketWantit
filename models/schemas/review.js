const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewId = require("./types/short-id");

const reviewSchema = new Schema({
  reviewId,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
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

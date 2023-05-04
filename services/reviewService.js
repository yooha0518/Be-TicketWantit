const { Order } = require("../models");
const { Review } = require("../models");

const reviewService = {
  async createReview({ userId, rate, content }) {
    const review = await Review.create({ userId, rate, content });
  },
};

module.exports = reviewService;

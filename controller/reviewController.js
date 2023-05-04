const { reviewService } = require("../services");

const reviewController = {
  async getOrder(req, res, next) {
    const userId = req.user.shortId;
    try {
      const { rate, content } = req.body;
      const review = await reviewService.createReview(userId, rate, content);
    } catch (err) {
      next(err);
    }
  },
};
module.exports = reviewController;

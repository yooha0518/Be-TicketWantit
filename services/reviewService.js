const e = require("express");
const { Order } = require("../models");
const { Review } = require("../models");
const mongoose = require("mongoose");

const reviewService = {
  // async createReview({ userId, rate, content }) {
  //   const review = await Review.create({ userId, rate, content });
  // },

  async getOrder(userId) {
    try {
      const userOrder = await Order.find({ userId, isReviewed: false })
        .sort({ createdAt: -1 })
        .exec();
      return userOrder;
    } catch (error) {
      console.log(error);
    }
  },
  async getReview(userId) {
    try {
      const userReview = await Review.find({ userId })
        .sort({ createdAt: -1 })
        .exec();
      return userReview;
    } catch (error) {
      console.log(error);
    }
  },
  async postReview({ userId, orderId, rate, reviewContent, productId }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 리뷰 생성
      const review = await Review.create(
        [{ userId, orderId, rate, reviewContent, productId }],
        { session }
      );

      // 주문 업데이트
      await Order.findOneAndUpdate(
        { orderId },
        { $set: { isReviewed: true } },
        { session }
      );
      await session.commitTransaction();
      session.endSession();

      console.log("리뷰 작성 및 주문 업데이트가 성공적으로 완료되었습니다.");
      return review;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log("리뷰 작성 또는 주문 업데이트 중에 오류가 발생했습니다.");
    }
  },
  async putReview(targetReviewId, targetRate, targetReviewContent) {
    try {
      const updatedReview = await Review.findOneAndUpdate(
        { reviewId: targetReviewId },
        { $set: { rate: targetRate, reviewContent: targetReviewContent } },
        { new: true }
      );
      return updatedReview;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  async deleteReview(reviewId) {
    try {
      await Review.deleteOne({ reviewId });
      return "deleted";
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = reviewService;

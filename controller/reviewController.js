const { reviewService } = require("../services");

const reviewController = {
  async getOrder(req, res, next) {
    const userId = req.user.shortId;
    try {
      const orderList = await reviewService.getOrder(userId);
      if (orderList.length < 1) {
        res.send({
          message: "해당 유저의 작성가능한 리뷰가 없습니다.",
          orderList: [],
        });
        return;
      }
      res.send({ message: "success", orderList: orderList });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "유저의 리뷰리스트를 가져오는데 실패했습니다." });
      next(err);
    }
  },
  async postReview(req, res, next) {
    const userId = req.user.shortId;
    try {
      const { orderId, reviewContent, rate, productId } = req.body;
      const review = await reviewService.postReview({
        userId,
        orderId,
        reviewContent,
        rate,
        productId,
      });
      console.log("리뷰 포스팅에 성공했습니다.");
      res.status(200).json({ message: "success", data: review });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "리뷰 업로드에 실패했습니다." });
      next(err);
    }
  },
  async putReview(req, res, next) {
    //리뷰아이디로
    const reviewId = req.params.reviewId;
    console.log(reviewId);
    const { rate, reviewContent } = req.body;
    console.log(rate, reviewContent);
    try {
      const review = await reviewService.putReview(
        reviewId,
        rate,
        reviewContent
      );
      if (!review) {
        res.status(404).send({ message: "review not found" });
      }
      res.status(200).send({ message: "리뷰 수정 성공", data: review });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "리뷰 업데이트에 실패했습니다." });
      next(error);
    }
  },
  async getReview(req, res, next) {
    const userId = req.user.shortId;
    try {
      const review = await reviewService.getReview(userId);
      res.status(200).send({ message: "success", data: review });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "해당 유저의 리뷰조회에 실패했습니다." });
      next(error);
    }
  },
  async deleteReview(req, res, next) {
    const reviewId = req.params.reviewId;
    try {
      const isDeleted = await reviewService.deleteReview(reviewId);
      if (isDeleted === "deleted") {
        res.status(200).send({ message: "success" });
        return;
      }
      res.status(404).send({ message: "review not found" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "review delete error" });
      next(error);
    }
  },
};
module.exports = reviewController;

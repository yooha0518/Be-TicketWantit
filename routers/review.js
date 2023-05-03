const { Router } = require("express");
const reviewRouter = Router();
const { reviewController } = require("../controller");

//유저 리뷰작성
reviewRouter.post("/", reviewController.postReview);

//유저의 리뷰 조회

//유저 리뷰수정

//유저 리뷰삭제

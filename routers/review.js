const { Router } = require('express');
const reviewRouter = Router();
const { reviewController } = require('../controller');

//유저 리뷰작성
reviewRouter.post('/', reviewController.postReview);

//유저 주문내역 가져오기
reviewRouter.get('/', reviewController.getOrder);

//유저의 리뷰 조회
reviewRouter.get('/mypage', reviewController.getReview);

//유저 리뷰수정
reviewRouter.put('/:reviewId', reviewController.putReview);

//유저 리뷰삭제
reviewRouter.delete('/:reviewId', reviewController.deleteReview);

module.exports = reviewRouter;

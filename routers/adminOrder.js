const {Router} = require('express');
const adminOrderRouter = Router();
const {adminOrderController} = require('../controller');

//관리자 페이지 주문 정보 수정 -> orderStatus 1:주문 2:배송시작 3:배송완료
//관리자가 주문 정보를 수정할 때 유저 정보로도 검색이 되고, 주문번호로도 조회를 해야할거같은데 -> keep (검색기능 구현)
adminOrderRouter.patch('/:orderId/:orderStatus', adminOrderController.patchOrder);

//관리자 전체주문조회 
adminOrderRouter.get('/', adminOrderController.getOrder);

//관리자 특정 유저주문조회..? 일단 이건 keep!
adminOrderRouter.get('/user/:searchWord', adminOrderController.getUserOrder);

//관리자페이지 주문정보 삭제(취소)
adminOrderRouter.delete('/:orderId', adminOrderController.deleteOrder);

module.exports = adminOrderRouter;
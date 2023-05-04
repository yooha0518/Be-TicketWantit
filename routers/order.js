const {Router} = require('express');
const orderRouter = Router();
const {orderController} = require('../controller');
const deliveryRouter = require('./deliveryRouter');

//주문추가
orderRouter.post('/', orderController.postOrder );

//특정 유저 주문조회
orderRouter.get('/', orderController.getOrder);  

//유저 주문수정 - 배송 전까지 취소 가능
orderRouter.delete('/:orderId',orderController.deleteOrder);

//유저 주문 수정 - 배송 전까지 정보 수정(배송지, 휴대폰 번호)
orderRouter.put('/:orderId',orderController.updateOrder);

orderRouter.use('/delivery',deliveryRouter);

module.exports = orderRouter;
const { Router } = require("express");
const adminOrderRouter = Router();
const { adminOrderController } = require("../controller");

//관리자 페이지 주문 정보 수정 -> orderStatus 1:주문 2:배송시작 3:배송완료 4:구매확정
adminOrderRouter.put("/:orderId/:orderStatus", adminOrderController.putOrder);

//관리자 전체주문조회
adminOrderRouter.get("/", adminOrderController.getOrder);

//관리자 특정 유저주문조회..?
adminOrderRouter.get("/user/:searchWord", adminOrderController.getUserOrder);

//관리자페이지 주문정보 삭제(취소)
adminOrderRouter.delete("/:orderId", adminOrderController.deleteOrder);

//관리자페이지 주문정보 삭제(취소)
adminOrderRouter.delete("/", adminOrderController.deleteAll);

module.exports = adminOrderRouter;

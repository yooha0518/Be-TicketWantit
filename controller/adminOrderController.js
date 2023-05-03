const { adminOrderService } = require("../services");
const appError = require("../utils/appError");
const commonErrors = require("../utils/commonErrors");

const adminOrderController = {
  async getOrder(req, res, next) {
    try {
      const getOrderList = await adminOrderService.getOrder();
      if (getOrderList.length < 1) {
        res
          .status(404)
          .send({ message: "주문 내역이 없습니다", getOrderList: [] });
        return;
      }
      res.status(200).send({
        message: "전체 주문내역을 조회합니다",
        orderList: getOrderList,
      });
    } catch (error) {
      res.status(500).send({ mesage: "전체 주문내역 조회에 실패했습니다." });
    }
  },
  async getUserOrder(req, res, next) {
    const { searchWord } = req.params;
    console.log(searchWord);
    try {
      const getUserOrder = await adminOrderService.getUserOrder(searchWord);
      if (getUserOrder.length >= 1) {
        res.status(200).send({
          message: "해당 유저의 주문조회에 성공했습니다.",
          orderList: getUserOrder,
        });
      } else {
        res
          .status(404)
          .send({ message: "유저의 주문내역이 없습니다", orderList: [] });
      }
    } catch (error) {
      res.status(500).send({ message: "유저의 주문내역 조회 실패" });
      next(error);
    }
    console.log(error);
    next(error);
  },
  async deleteOrder(req, res, next) {
    const orderId = req.params.orderId;
    try {
      const deleteOrder = await adminOrderService.deleteOrder(orderId);
      if (deleteOrder === "success")
        res.status(200).send("해당 주문이 취소되었습니다.");
    } catch (error) {
      res.status(500).send("주문 취소에 실패하였습니다");
      next(error);
    }
  },
  async putOrder(req, res, next) {
    const { orderId, orderStatus } = req.params;
    try {
      if (orderStatus == 2) {
        const orderUpdate = await adminOrderService.putOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);
        res
          .send(200)
          .status({ message: "주문상태가 배송중으로 변경되었습니다." });
      } else if (orderStatus == 3) {
        const orderUpdate = await adminOrderService.putOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);
        res
          .status(200)
          .send({ message: "주문상태가 배송완료로 변경되었습니다." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("주문상태 변경에 실패");
      next(error);
    }
  },
  async deleteAll(req, res, next) {
    try {
      const deleteData = await adminOrderService.deleteAll();
      if (deleteData == "success") {
        res.status(200).send({ message: "전체 주문내역이 삭제되었습니다." });
      }
    } catch (error) {
      res.status(500).send({ message: "전체 주문내역 삭제에 실패였습니다" });
      next(error);
    }
  },
};

module.exports = adminOrderController;

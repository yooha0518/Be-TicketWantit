const { adminOrderService } = require("../services");
const appError = require("../utils/appError");
const commonErrors = require("../utils/commonErrors");

const adminOrderController = {
  async getOrder(req, res, next) {
    try {
      const getOrderList = await adminOrderService.getOrder();
      if (getOrderList.length < 1) {
        res.status(404).send({ message: "주문 내역이 없습니다" });
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
        res.status(404).send({ message: "유저의 주문내역이 없습니다" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async deleteOrder(req, res, next) {
    const orderId = req.params.orderId;
    try {
      const deleteOrder = await adminOrderService.deleteOrder(orderId);
      if (deleteOrder === "success")
        res.status(200).send("data delete success");
      else res.status(404).send("data delete failed");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async patchOrder(req, res, next) {
    const { orderId, orderStatus } = req.params;
    try {
      if (orderStatus == 2) {
        const orderUpdate = await adminOrderService.patchOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);
        res
          .send(200)
          .status({ message: "주문상태가 배송중으로 변경되었습니다." });
      } else if (orderStatus == 3) {
        const orderUpdate = await adminOrderService.patchOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);
        res
          .status(200)
          .send({ message: "주문상태가 배송완료으로 변경되었습니다." });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async deleteAll(req, res, next) {
    try {
      const deleteData = await adminOrderService.deleteAll();
      if (deleteData == "success") {
        res.status(200).send({ message: "data deleted success" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminOrderController;

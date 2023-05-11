const { adminOrderService } = require("../services");
const schedule = require("node-schedule");

const adminOrderController = {
  async getOrder(req, res, next) {
    const page = req.query.page || 1;
    try {
      const { getOrderList, pageInfo } = await adminOrderService.getOrder(page);
      if (getOrderList.length < 1) {
        res
          .status(404)
          .send({ message: "주문 내역이 없습니다", getOrderList: [] });
        return;
      }
      res.status(200).send({
        message: "전체 주문내역을 조회합니다",
        pageInfo: pageInfo,
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
    const orderId = req.params.orderId;
    let orderStatus = req.params.orderStatus;
    if (!orderStatus) {
      console.log(orderStatus);
      orderStatus = "4";
    }
    try {
      if (orderStatus == 2) {
        const orderUpdate = await adminOrderService.putOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);
        res
          .send({ message: "주문상태가 배송중으로 변경되었습니다." })
          .status(200);
      } else if (orderStatus == 3) {
        const orderUpdate = await adminOrderService.putOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);

        const date = new Date();
        date.setDate(date.getDate() + 3);
        schedule.scheduleJob("*/1 * * * *", async function () {
          // 3일 후에 실행될 코드를 작성해야됨
          console.log("1분 지났음~");
          await adminOrderService.putOrder(orderId, 4);
        });

        res
          .status(200)
          .send({ message: "주문상태가 배송완료로 변경되었습니다." });
      } else if (orderStatus == 4) {
        const orderUpdate = await adminOrderService.putOrder(
          orderId,
          orderStatus
        );
        console.log(orderUpdate);
        res
          .status(200)
          .send({ message: "주문상태가 구매확정으로 변경되었습니다." });
      } else {
        res.status(500).send({ message: "잘못된 주문상태코드 입니다." });
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

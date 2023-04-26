const { orderService } = require("../services");

const orderController = {
  async postOrder(req, res, next) {
    const userId = req.user.shortId;
    try {
      const {
        items,
        totalPrice,
        customerAddress,
        customerPhoneNum,
        zipCode,
        imgUrl,
      } = req.body;
      const order = await orderService.createOrder({
        userId,
        imgUrl,
        customerAddress,
        customerPhoneNum,
        items,
        totalPrice,
        zipCode,
      });
      console.log("Order created successfully: " + order);
      res.status(200).json({ message: "data saved", orderId: order.orderId });
    } catch (error) {
      console.log("데이터를 db에 저장하는 것에 실패했습니다." + error);
      res.status(500).send({ message: "data save failed" });
      next(error);
    }
  },
  async getOrder(req, res, next) {
    //유저의 주문내역
    const userId = req.user.shortId;
    try {
      const orderList = await orderService.getOrder(userId); //db에서 받아온 값이 넘어옴
      if (orderList.length < 1) {
        res
          .status(404)
          .send({ mesage: "해당 유저의 주문내역이 존재하지 않습니다." });
      }
      res
        .status(200)
        .send({ message: "주문내역 조회 성공", orderList: orderList });
    } catch (error) {
      next(error);
    }
  },
  async deleteOrder(req, res, next) {
    //orderId req.body로 받아오는걸로 수정!
    const orderId = req.params.orderId;
    try {
      const isCanceled = await orderService.deleteOrder(orderId);
      if (isCanceled === 1) {
        res.status(200).send("user order is canceled successfully");
      } else {
        res.status(404).send("please check orderStatus!");
      }
    } catch (error) {
      console.log("유저주문 취소 에러 발생" + err);
      next(error);
    }
  },
  async updateOrder(req, res, next) {
    //배송전 주문정보 수정
    const orderId = req.params.orderId;
    const { customerAddress, customerPhoneNum } = req.body;
    try {
      const isDelivered = await orderService.updateOrder(
        orderId,
        customerAddress,
        customerPhoneNum
      );
      if (isDelivered === 1) {
        res.status(200).send("유저 주문 정보가 수정되었습니다.");
      } else {
        res.status(404).send("이미 배송중인 상품입니다.");
      }
    } catch (error) {
      console.log("유저의 주문 정보 수정에 실패했습니다.");
      next(error);
    }
  },
};

module.exports = orderController;

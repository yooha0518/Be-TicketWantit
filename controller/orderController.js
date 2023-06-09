const { orderService } = require("../services");

const orderController = {
  async postOrder(req, res, next) {
    const userId = req.user.shortId;
    try {
      const {
        items,
        totalPrice,
        deliveryAddress,
        deliveryPhoneNum,
        zipCode,
        imgUrl,
        productId,
      } = req.body;
      const order = await orderService.createOrder({
        userId,
        imgUrl,
        deliveryAddress,
        deliveryPhoneNum,
        items,
        totalPrice,
        zipCode,
        productId,
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
        res.send({
          message: "해당 유저의 주문내역이 존재하지 않습니다.",
          orderList: [],
        });
      }
      res
        .status(200)
        .send({ message: "유저 주문내역 조회 성공", orderList: orderList });
    } catch (error) {
      res.send(500).send({ message: "유저 주문내역 조회 실패" });
      next(error);
    }
  },
  async deleteOrder(req, res, next) {
    //orderId req.body로 받아오는걸로 수정!
    const orderId = req.params.orderId;
    try {
      const isCanceled = await orderService.deleteOrder(orderId);
      if (isCanceled === 1) {
        res.status(200).send("유저의 주문이 취소되었습니다");
      } else {
        res.status(404).send("이미 배송중인 상품입니다.");
      }
    } catch (error) {
      console.log("유저주문 취소 에러 발생" + err);
      res.send(500).send("유저 주문 취소 실패");
      next(error);
    }
  },
  async updateOrder(req, res, next) {
    //배송전 주문정보 수정
    const orderId = req.params.orderId;
    const { deliveryAddress, deliveryPhoneNum } = req.body;
    try {
      const isDelivered = await orderService.updateOrder(
        orderId,
        deliveryAddress,
        deliveryPhoneNum
      );
      if (isDelivered === 1) {
        res.status(200).send("유저 주문 정보가 수정되었습니다.");
      } else {
        res.status(404).send("이미 배송중인 상품입니다.");
      }
    } catch (error) {
      console.log("유저의 주문 정보 수정에 실패했습니다.");
      res.send(500).send("유저 주문정보 수정 실패");
      next(error);
    }
  },
};

module.exports = orderController;

const { Order } = require("../models");
const { User } = require("../models");

const orderService = {
  // 주문 추가 (주문하기)
  async createOrder({
    userId,
    customerPhoneNum,
    customerAddress,
    items,
    totalPrice,
    zipCode,
  }) {
    const user = await User.findOne({ userId });
    if (
      !customerPhoneNum ||
      !customerAddress ||
      !items ||
      !totalPrice ||
      !zipCode
    ) {
      throw new Error("정보를 모두 입력해주세요");
    }
    const createdOrder = await Order.create({
      userId,
      customerId: user._id,
      items,
      customerAddress,
      customerPhoneNum,
      totalPrice,
      zipCode,
    });
    return createdOrder;
  },
  // 유저 주문 조회
  async getOrder(userId) {
    console.log(userId);
    try {
      const userOrder = await Order.find({ userId })
        .populate("customerId")
        .exec();
      if (!userOrder) {
        throw new Error("주문 내역이 없습니다");
      }
      console.log(userOrder);
      return userOrder;
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // 유저 주문 수정(주문전 주문 취소)
  async deleteOrder(shortId, orderId) {
    try {
      const order = await Order.find({ shortId, orderId }).populate(
        "customerId"
      );
      const orderStatus = order[0].orderStatus;
      if (orderStatus == 1) {
        await Order.deleteOne({ orderId });
        console.log("유저 주문이 취소되었습니다.");
        return 1;
      } else {
        console.log("이미 배송된 상품입니다.");
        return 2;
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async updateOrder(
    putTargetOrderId,
    putTargetCustomerAddress,
    putTargetCustomerPhoneNum
  ) {
    try {
      const order = await Order.find({ orderId: putTargetOrderId })
        .populate("customerId")
        .exec();
      console.log(order);
      const orderStatus = order[0].orderStatus;
      if (orderStatus == 1) {
        await Order.updateMany(
          { orderId: putTargetOrderId },
          {
            customerAddress: putTargetCustomerAddress,
            customerPhoneNum: putTargetCustomerPhoneNum,
          }
        );
        console.log("유저의 주문정보가 수정되었습니다");
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log("유저의 주문정보 수정에 실패했습니다.");
      next(error);
    }
  },
};

module.exports = orderService;

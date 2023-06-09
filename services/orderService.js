const { Order } = require("../models");
const { User } = require("../models");
const asyncHandler = require("../utils/async-handler");

const orderService = {
  // 주문 추가 (주문하기)
  async createOrder({
    userId,
    imgUrl,
    deliveryPhoneNum,
    deliveryAddress,
    items,
    totalPrice,
    zipCode,
    productId,
  }) {
    const user = await User.findOne({ shortId: userId }).lean();
    console.log("유저아이디" + user._id);
    const createdOrder = await Order.create({
      userId, //user._id는 populate를 위해 필요하지만, 저 값 자체는 사용을 잘 안하기에 따로 명시
      customerId: user._id,
      imgUrl,
      items,
      deliveryAddress,
      deliveryPhoneNum,
      totalPrice,
      zipCode,
      productId,
    });
    return createdOrder;
  },
  // 유저 주문 조회
  async getOrder(userId) {
    try {
      const userOrder = await Order.find({ userId })
        .sort({ createdAt: -1 })
        .exec();
      return userOrder;
    } catch (error) {
      console.log(error);
    }
  },
  // 유저 주문 수정(주문전 주문 취소)
  async deleteOrder(orderId) {
    try {
      const order = await Order.find({ orderId }).populate("customerId").lean();
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
    }
  }, //여기까지 asyncHandler 수정했음!
  async updateOrder(
    putTargetOrderId,
    putTargetDeliveryAddress,
    putTargetDeliveryPhoneNum
  ) {
    try {
      const order = await Order.find({ orderId: putTargetOrderId })
        .lean()
        .populate("customerId")
        .exec();
      console.log(order);
      const orderStatus = order[0].orderStatus;
      if (orderStatus == 1) {
        await Order.updateMany(
          { orderId: putTargetOrderId },
          {
            deliveryAddress: putTargetDeliveryAddress,
            deliveryPhoneNum: putTargetDeliveryPhoneNum,
          }
        ).lean();
        console.log("유저의 주문정보가 수정되었습니다");
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log("유저의 주문정보 수정에 실패했습니다." + error);
    }
  },
};

module.exports = orderService;

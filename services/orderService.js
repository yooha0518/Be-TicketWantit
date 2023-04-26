const { Order } = require("../models");
const { User } = require("../models");
const asyncHandler = require("express-async-handler");

const orderService = {
  // 주문 추가 (주문하기)
  createOrder: asyncHandler(
    async ({
      userId,
      imgUrl,
      customerPhoneNum,
      customerAddress,
      items,
      totalPrice,
      zipCode,
    }) => {
      const user = await User.findOne({ userId }).lean();
      const createdOrder = await Order.create({
        userId, //user._id는 populate를 위해 필요하지만, 저 값 자체는 사용을 잘 안하기에 따로 명시
        customerId: user._id,
        imgUrl,
        items,
        customerAddress,
        customerPhoneNum,
        totalPrice,
        zipCode,
      });
      return createdOrder;
    }
  ),
  // 유저 주문 조회
  getOrder: asyncHandler(async (userId) => {
    try {
      const userOrder = await Order.find({ userId })
        .sort({ date: -1 })
        .exec()
        .lean();
      console.log(userOrder);
      return userOrder;
    } catch (error) {
      console.log(error);
    }
  }),
  // 유저 주문 수정(주문전 주문 취소)
  deleteOrder: asyncHandler(async (orderId) => {
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
  }), //여기까지 asyncHandler 수정했음!
  async updateOrder(
    putTargetOrderId,
    putTargetCustomerAddress,
    putTargetCustomerPhoneNum
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
            customerAddress: putTargetCustomerAddress,
            customerPhoneNum: putTargetCustomerPhoneNum,
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

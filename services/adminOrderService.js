const { Order } = require("../models");
const { User } = require("../models");

const adminOrderService = {
  //관리자 주문조회 - db에 있는 모든 주문내역
  async getOrder() {
    try {
      const orderList = await Order.find({})
        .populate("customerId")
        .sort({ createdAt: -1 })
        .exec();
      console.log(orderList);
      return orderList;
    } catch (error) {
      console.log(error);
    }
  },
  //관리자 유저주문조회 - 특정 유저의 주문내역 조회 (검색)..?
  async getUserOrder(searchWord) {
    try {
      const searchUserOrder = await Order.find({
        $or: [
          { orderId: searchWord },
          {
            customerId: {
              $in: await User.find({ email: searchWord }).distinct("_id"),
            },
          },
        ],
      })
        .populate("customerId")
        .exec();
      return searchUserOrder;
    } catch (error) {
      console.log(error);
    }
  },
  async deleteOrder(orderId) {
    try {
      await Order.deleteOne({ orderId });
      return "success";
    } catch (error) {
      console.log("관리자 주문 삭제");
    }
  },
  async patchOrder(orderId, orderStatus) {
    try {
      const orderUpdate = await Order.findOneAndUpdate(
        { orderId: orderId },
        { orderStatus: orderStatus }
      );
      return orderUpdate;
    } catch (err) {
      console.log("배송상태 변경 중 에러발생" + err);
    }
  },
  async deleteAll() {
    try {
      await Order.deleteMany({});
      return "success";
    } catch (err) {
      console.log(err);
    }
  },
};
module.exports = adminOrderService;

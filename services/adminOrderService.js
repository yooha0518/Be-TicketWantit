const { Order } = require("../models");
const { User } = require("../models");

const adminOrderService = {
  //관리자 주문조회 - db에 있는 모든 주문내역
  async getOrder(page) {
    const pageNum = Number(page);
    const limit = 10;
    const startPage = (pageNum - 1) * limit;
    const endPage = pageNum * limit;
    const total = await Order.countDocuments();

    try {
      const getOrderList = await Order.find({})
        .populate("customerId")
        .sort({ _id: -1 })
        .skip(startPage)
        .limit(limit)
        .exec();

      const pageInfo = {
        currentPage: pageNum,
        totalPage: Math.ceil(total / limit),
        prevPage: pageNum > 1 ? pageNum - 1 : null,
        nextPage: endPage < total ? pageNum + 1 : null,
      };
      console.log(getOrderList);
      return { getOrderList, pageInfo };
    } catch (error) {
      console.log(error);
    }
  },
  //관리자 유저주문조회 - 특정 유저의 주문내역 조회 (검색)
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
      console.log("관리자 주문 삭제 실패");
    }
  },
  async putOrder(orderId, orderStatus) {
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

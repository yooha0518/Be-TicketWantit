const {Order} = require('../models');
const {User} = require('../models');

const adminOrderService = {
    //관리자 주문조회 - db에 있는 모든 주문내역
    async getOrder(){
        try{
            const orderList = await Order.find({});
            console.log(orderList);
            return orderList;
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    //관리자 유저주문조회 - 특정 유저의 주문내역 조회 (검색)..?
    async getUserOrder(searchWord){
        try {
            const searchUserOrder = await Order.find({
                $or: [
                    { orderId: searchWord },
                    { customerId: { $in: await User.find({ email: searchWord }).distinct('_id') } }
                ]
                }).populate('customerId').exec();
            return searchUserOrder;
        } catch(error) {
            console.log(error);
            next(error);
        }
    },
    async deleteOrder(orderId){
        try{
            await Order.deleteOne({orderId})
            return "success";
        }catch(error){
            console.log('관리자 주문 삭제')
            next(error);
        }
    },
    async patchOrder(orderId,orderStatus){
        try{
            const orderUpdate = await Order.findOneAndUpdate({orderId:orderId},{orderStatus:orderStatus});
            return orderUpdate;    
        }catch(err){
                console.log('배송상태 변경 중 에러발생' + err);
                next(err);
            }
    },
}


module.exports = adminOrderService;
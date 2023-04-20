const {Order} = require('../models');

const orderService = {
    // 주문 추가 (주문하기)
    async createOrder({shortId,customerPhoneNum,customerAddress,items,totalPrice}){
        const createdOrder = await Order.create({
            customerId:shortId,
            items,
            customerAddress,
            customerPhoneNum,
            totalPrice,
        });
        return createdOrder;
    },
    // 유저 주문 조회
    async getOrder(shortId){
            const userOrder = await Order.find({shortId}).populate('customerId');
            console.log(userOrder);

            return userOrder;
    }
}


module.exports = orderService;
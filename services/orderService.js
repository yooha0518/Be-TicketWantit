const {Order} = require('../models');
const {User} = require('../models');
const orderService = {
    // 주문 추가 (주문하기)
    async createOrder({shortId,customerPhoneNum,customerAddress,items,totalPrice}){//중괄호의 역할이 뭐야
        const user = await User.findOne({shortId});
        if(!customerPhoneNum||!customerAddress||!items||totalPrice){
            throw new Error("정보를 모두 입력해주세요");
        }
        const createdOrder = await Order.create({
            customerId:user._id,
            items,
            customerAddress,
            customerPhoneNum,
            totalPrice,
        });
        return createdOrder;
    },
    // 유저 주문 조회
    async getOrder(shortId){
        try{
            const userOrder = await Order.find({shortId}).populate('customerId');
            if(!userOrder){
                throw new Error("주문 내역이 없습니다");
            }
            console.log(userOrder);
            return userOrder;
        }catch(error){
            console.log(error);
            next(error);
        }    
    },
    // 유저 주문 수정(주문전 주문 취소)
    async deleteOrder(shortId,orderId){
        try{ 
            const order = await Order.find({shortId,orderId}).populate('customerId');
            const orderStatus = order[0].orderStatus;
            if(orderStatus== 1){
                await Order.deleteOne({orderId});
                console.log('유저 주문이 취소되었습니다.')
                return 1;
            }else{
                console.log('이미 배송된 상품입니다.')
                return 2;
            }
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    //유저 정보수정(주문전 주문정보 변경)
}


module.exports = orderService;
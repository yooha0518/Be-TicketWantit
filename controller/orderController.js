const {orderService} = require('../services');

const orderController = {
    async postOrder(req,res,next){
        const shortId = req.user.shortId;
        try{
            const { items, totalPrice,customerAddress,customerPhoneNum} = req.body;
            const order = await orderService.createOrder({
                shortId,
                customerAddress,
                customerPhoneNum,
                items,
                totalPrice
            })
            console.log('Order created successfully: ' + order);
            res.status(200).json({mesage:'data saved',orderId:order.orderId});
        }catch (error) {
            console.log('데이터를 db에 저장하는 것에 실패했습니다.' + error);
            res.status(500).send({mesage:'data saved'})
            next(error);
        }
    },
    async getOrder(req,res,next){ //유저의 주문내역 
        const shortId = req.user.shortId;
        try{
            const orderList = await orderService.getOrder(shortId); //db에서 받아온 값이 넘어옴
            if(orderList.length <1){
                        res.status(404).send({mesage:'해당 유저의 주문내역이 존재하지 않습니다.'})
                    }              
            res.status(200).send({message:'주문내역 조회 성공',orderList:orderList});
        }catch(error){
            next(error);
        }
    },
    async deleteOrder(req,res,next){
        const shortId = req.user.shortId;
        const orderId = req.params.orderId;
        try{
            const isCanceled = await orderService.deleteOrder(shortId,orderId);
            if(isCanceled === 1){
                res.status(200).send('user order is canceled successfully');
            }else{
                res.status(404).send('please check orderStatus!');
            }
        }catch(error){
            console.log('유저주문 취소 에러 발생' + err);
            next(error);
        }
    },
    
}

module.exports = orderController;
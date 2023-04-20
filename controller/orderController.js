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
            res.status(200).send('data saved');
        }catch (error) {
            console.log('데이터를 db에 저장하는 것에 실패했습니다.' + error);
            res.status(500).send('data save failed')
            next(error);
        }
    },
    async getOrder(req,res,next){
        const shortId = req.user.shortId;
        try{
            const orderList = await orderService.getOrder(shortId); //db에서 받아온 값이 넘어옴
            if(orderList.length <1){
                        res.status(404).send('유저의 주문내역이 존재하지 않습니다.')
                    }              
                    res.status(200).send(orderList);
        }catch(error){
            next(error);
        }
    }
    
}

module.exports = orderController;
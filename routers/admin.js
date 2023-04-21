const {Router} = require('express');
const router = Router();
const models = require('../models');
const Order = models.Order;
const User = models.User;

//관리자 페이지 주문 정보 수정 -> orderStatus 1:주문 2:배송시작 3:배송완료
//관리자가 주문 정보를 수정할 때 유저 정보로도 검색이 되고, 주문번호로도 조회를 해야할거같은데 
//주문상태 수정 버튼을 누르면 해당 주문 아이디 넘겨주세요..
//배송완료는 유저가 구매확정버튼을 눌러줘야하는데...! 아니면 일정기간이 지난다거나..?
router.patch('/:orderId/:orderStatus', async(req,res,next)=>{
    const {orderId,orderStatus} = req.params;
    // const order = await Order.findOne({orderId});
    // console.log(order)
    // console.log(orderStatus)
    // res.send('ok');
    try{
        if(orderStatus == 2){
            const orderUpdate = await Order.findOneAndUpdate({orderId:orderId},{orderStatus:orderStatus});
            console.log(orderUpdate)
            res.status(200).send('주문상태가 배송중으로 변경되었습니다.');
        }else if(orderStatus == 3){
            const orderUpdate = await Order.findOneAndUpdate({orderId:orderId},{orderStatus:orderStatus});
            console.log(orderUpdate)
            res.status(200).send('주문상태가 배송완료로 변경되었습니다');
        }
    }catch(err){
        console.log('배송상태 변경 중 에러발생' + err);
        res.status(404).send('주문 상태 변경에 실패했습니다')
        next(err);
    }

    
})

//관리자 전체주문조회 **find류의 함수는 콜백이랑 같이 못쓰는건가?
router.get('/', async(req,res,next)=>{
        try{
            const orderList = await Order.find({});
            console.log('전체 데이터 조회: ' + orderList);
            res.status(200).send(orderList) 
        }catch(err){
            console.log('전체주문 조회 실패' + err);
            res.status(404).send('data inquery failed')
            next(err);
        }
})

//관리자페이지 주문정보 삭제(취소)
router.delete('/:orderId', async(req,res,next)=>{
    const orderId = req.params.orderId;
    try{
        await Order.deleteOne({orderId})
        res.status(200).send('data delete success');
    }catch(err){
        console.log('관리자 주문 삭제')
        res.status(404).send('data delete failed');
        next(err);
    }
})

module.exports = router;
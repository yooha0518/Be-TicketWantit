const {Router} = require('express');
const router = Router();
const models = require('../models');
const Order = models.Order;
const User = models.User;
//모든 요청에 로그인정보 확인해야함! 비회원은 안됨!
   // if(req.user.shortId){ //세션값 받아와지는거 확인하기 
        // console.log('세션값 있음');
    // }

//주문추가 - 결제버튼을 누르면 결제창에 있는 상품들로 주문 할 수 있다
router.post('/', async(req,res)=>{
 
    const {customerName,customerEmail,customerAddress,items,total} = req.body;
        await Order.create({customerName,customerEmail,items,customerAddress,total},(err,order)=>{
        if(err){
            console.log('데이터를 db에 저장하는 것에 실패했습니다.' + err);
            res.status(500).send('data save failed')
        }else{
            console.log('Order created successfully: ', order)
            res.status(200).send('data saved');
        }
    });
    //주문완료 - 주문 완료 시, 주문완료 페이지로 이동한다. -> ??
})



//특정 유저 주문조회 -> 무조건!! populate써서 고치기!!! 빨리 끝내고 리팩토링하자
router.get('/:shortId', async(req,res,next)=>{   
    const shortId = req.params.shortId;
    if(shortId === 'admin'){
        next(err);
    }
    console.log(shortId);
    const userInfo = await User.findOne({shortId});
    const orderList = await Order.find({customerName:userInfo.name});  
    if(orderList.length <1){
        res.status(404).send('유저의 주문내역이 존재하지 않습니다.')
    }              
    res.status(200).send(orderList);
}); 

//주문수정 - 주문완료 후 배송이 시작되기 전까지는 주문 취소 가능****************************************************
router.delete('/:shortId/:orderId',async(req,res,next)=>{ //헤더로 로그인정보 보내주심. req.헤더 내용 받아오고 (로그인정보) 
     //로그인되어있는지 확인하고, 
    // if(req.user.shortId){
    //     const user = await User.findOne({req.user.shorId});
   //      const userOrder = await Order.findOne({customerName:user.name})
    //      
//}else{ 로그인이 안되어있으면}

     //orderStatus가 1이면 삭제가능!!
    // const orderId = req.params.orderId;
    const shortId = req.params.shortId;
    const orderId = req.params.orderId;
    const userInfo = await User.findOne({shortId});
    const orderList = await Order.findOne({customerName:userInfo.name,orderId:orderId}); 
    try{
        if(orderList.orderStatus == 1){
            await Order.deleteOne({orderId});
            console.log('유저 주문이 취소되었습니다.')
            res.status(200).send('user order is canceled successfully');
        }else{
            console.log('이미 배송된 상품입니다.')
            res.status(404).send('check orderStatus')
        }
    }catch(err){
        console.log('유저주문 취소 에러 발생' + err);
        next(err);
    }
  
    
})




module.exports = router;
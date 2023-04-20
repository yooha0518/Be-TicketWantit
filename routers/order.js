const {Router} = require('express');
const orderRouter = Router();
const {orderController} = require('../controller');


//모든 요청에 로그인정보 확인해야함! 비회원은 안됨!
   // if(req.user.shortId){ //세션값 받아와지는거 확인하기 
        // console.log('세션값 있음');
    // }

//주문추가 - 결제버튼을 누르면 결제창에 있는 상품들로 주문 할 수 있다
orderRouter.post('/', orderController.postOrder );


//특정 유저 주문조회 -> 무조건!! populate써서 고치기!!! 빨리 끝내고 리팩토링하자
orderRouter.get('/', orderController.getOrder);  

// //주문수정 - 주문완료 후 배송이 시작되기 전까지는 주문 취소 가능****************************************************
// router.delete('/:shortId/:orderId',async(req,res,next)=>{ //헤더로 로그인정보 보내주심. req.헤더 내용 받아오고 (로그인정보) 
//      //로그인되어있는지 확인하고, 
//     // if(req.user.shortId){
//     //     const user = await User.findOne({req.user.shorId});
//    //      const userOrder = await Order.findOne({customerName:user.name})
//     //      
// //}else{ 로그인이 안되어있으면}

//      //orderStatus가 1이면 삭제가능!!
//     const {shortId,orderId} = req.params;
//     const userInfo = await User.findOne({shortId});
//     const orderList = await Order.findOne({customerName:userInfo.name,orderId:orderId}); 
//     try{
//         if(orderList.orderStatus == 1){
//             await Order.deleteOne({orderId});
//             console.log('유저 주문이 취소되었습니다.')
//             res.status(200).send('user order is canceled successfully');
//         }else{
//             console.log('이미 배송된 상품입니다.')
//             res.status(404).send('please check orderStatus!')
//         }
//     }catch(err){
//         console.log('유저주문 취소 에러 발생' + err);
//         next(err);
//     }
  
// router.get('/test/:shortId',async(req,res)=>{
//     const {shortId} = req.params;
//     const data = await Order.find({shortId}).populate('customerId');
//     console.log(data);
//     res.send('ok');
// })
    
// })

module.exports = orderRouter;
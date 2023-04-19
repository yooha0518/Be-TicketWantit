const {Router} = require('express');
const router = Router();
const models = require('../models');
const Order = models.Order;
const User = models.User;
//모든 요청에 로그인정보 확인해야함! 비회원은 안됨!


//주문추가 - 결제버튼을 누르면 결제창에 있는 상품들로 주문 할 수 있다
router.post('/', async(req,res)=>{
    // if(req.user.shortId){ //세션값 받아와지는거 확인하기 
        // console.log('세션값 있음');
    // }
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

//전체주문조회
router.get('/', async(req,res)=>{
        const orderList = await Order.find({}, (err)=>{
            if(err){
                console.log('전체데이터 조회 실패: ' + err);
                return res.status(500).send({error: 'database failure'})
            }
        });
        console.log('전체 데이터 조회: ' + orderList);
        res.status(200).send(orderList) 
})

//특정 유저 주문조회 -> 무조건!! populate써서 고치기!!! 빨리 끝내고 리팩토링하자
router.get('/:shortId', async(req,res)=>{   
    const shortId = req.params.shortId; 
    const userInfo = await User.findOne({shortId});
    const orderList = await Order.find({customerName:userInfo.name});  
    if(orderList.length <1){
        res.status(404).send('유저의 주문내역이 존재하지 않습니다.')
    }              
    res.status(200).send(orderList);
}); 

//주문수정 - 주문완료 후 배송이 시작되기 전까지는 주문 취소 가능
router.delete('/:orderId',async(req,res)=>{ //헤더로 로그인정보 보내주심. req.헤더 내용 받아오고 (로그인정보) 
     //로그인되어있는지 확인하고, 
    const shortId = req.params.shortId;
    const userInfo = await User.findOne({shortId});
    const orderList = await Order.find({customerName:userInfo.name}); 
    console.log(orderList);
    console.log(orderList.orderStatus);
    res.send('ok');
})







module.exports = router;
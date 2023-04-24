const {adminOrderService} = require('../services');

const adminOrderController = { //관리자인지 확인 해줘야 하나..?
    async getOrder(req,res,next){
        try {
            const getOrderList = await adminOrderService.getOrder();
            if(getOrderList.length <1){
                res.status(404).send({message:"주문 내역이 없습니다"});
            }
            res.status(200).send({message:'전체 주문내역을 조회합니다',orderList:getOrderList})
        } catch(error) {
            console.log(error);
            res.status(500).send({mesage:'전체 주문내역 조회에 실패했습니다.'})
            next(error);
        }
    },
    async getUserOrder(req,res,next){
        const {searchWord} = req.params;
        console.log(searchWord);
        try{
            const getUserOrder = await adminOrderService.getUserOrder(searchWord);
            console.log(getUserOrder);
            res.send('ok');
        }catch(error){
            console.log(error);
            next(error);
        }
    },
    async deleteOrder(req,res,next){
        const orderId = req.params.orderId;
        try {
            const deleteOrder = await adminOrderService.deleteOrder(orderId);
            if(deleteOrder === "success") res.status(200).send('data delete success');
            else res.status(404).send('data delete failed');
        } catch(error) {
            console.log(error);
            next(error);
        }
    },
    async patchOrder(req,res,next){
        const {orderId,orderStatus} = req.params;
        try {
            if(orderStatus == 2){
                const orderUpdate = await adminOrderService.patchOrder(orderId,orderStatus);
                console.log(orderUpdate);
                res.send(200).status({message:"주문상태가 배송중으로 변경되었습니다."})
                return orderUpdate;
            }else if(orderStatus == 3){
                const orderUpdate = await adminOrderService.patchOrder(orderId,orderStatus);
                console.log(orderUpdate)
                res.status(200).send({message:"주문상태가 배송중으로 변경되었습니다."});
            }
        } catch(error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = adminOrderController;
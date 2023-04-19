const mongoose = rquire('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    orderId,
    customerName: {//고객명
        type: String,
        required: true
    },
    items: [{ //상품
        name: {
        type: String,
        required: true
    },
        quantity: { //수량
        type: Number,
        required: true
    },
        price: { //가격
        type: Number,
        required: true
    }
    }],
	customerAddress:{
        type:String,
        required:true
    },
    total: { //합계
        type: Number,
        required: true
    },
    orderStatus:{
        type:String,
        required: true
    },
    date: { //구매날짜
        type: Date,
        default: Date.now
    }
})

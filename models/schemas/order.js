const mongoose = require('mongoose');
const {Schema} = mongoose;
const orderId = require('./types/short-id');

const orderSchema = new Schema({ 
    orderId,
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    // customerName: {//고객명 -> 이걸 참고..?
    //     type: String,
    //     required: true
    // },
    customerAddress:{ //고객주소
        type: String,
        required: true
    },
    customerPhoneNum:{ //고객 연락처 
        type: String,
        require: true
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
    totalPrice: { //합계
        type: Number,
        required: true
    },
    orderStatus:{
        type:Number,
        default:1,
        required: true
    },
    date: { //구매날짜
        type: Date,
        default: Date.now
    }
})

module.exports = orderSchema;
const mongoose = require('mongoose');
const {Schema} = mongoose;
<<<<<<< HEAD
const orderId = require('./types/short-id')
=======
const orderId = require('./types/short-id');
>>>>>>> 9c81ae9f57c3560f78399a085a28b9464cd8c454

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

module.exports = orderSchema;
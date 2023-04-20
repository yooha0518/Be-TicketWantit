const mongoose = require('mongoose');
<<<<<<< HEAD
const { Schema } = mongoose;
const orderId = require('./types/short-id');

const orderSchema = new Schema({
  orderId,
  customerName: {
    //고객명
    type: String,
    required: true,
  },
  items: [
    {
      //상품
      name: {
        type: String,
        required: true,
      },
      quantity: {
        //수량
=======
const {Schema} = mongoose;
const orderId = require('./types/short-id');

const orderSchema = new Schema({ 
    orderId,
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    customerName: {//고객명 -> 이걸 참고..?
        type: String,
        required: true
    },
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
>>>>>>> d0bc6d8e38b3f1b9af9c68bbd429cb13ba71ed6b
        type: Number,
        required: true,
      },
      price: {
        //가격
        type: Number,
<<<<<<< HEAD
        required: true,
      },
    },
  ],
  customerAddress: {
    type: String,
    required: true,
  },
  total: {
    //합계
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  date: {
    //구매날짜
    type: Date,
    default: Date.now,
  },
});
=======
        required: true
    }
    }],
    total: { //합계
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
>>>>>>> d0bc6d8e38b3f1b9af9c68bbd429cb13ba71ed6b

module.exports = orderSchema;

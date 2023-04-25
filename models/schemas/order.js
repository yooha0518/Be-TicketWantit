const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderId = require('./types/short-id');
const dayjs = require('dayjs');
const formattedDate = dayjs().format('YYYY-MM-DD');

<<<<<<< HEAD
const orderSchema = new Schema({
  orderId: {
    type: String, // 스키마 유형을 String으로 지정합니다.
    required: true, // 필요한 경우 다른 옵션도 추가합니다.
    default: orderId,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  items: [
    {
      //상품
      name: {
=======
const orderSchema = new Schema({ 
    orderId: {
        type: String, 
        required: true, 
        default:orderId
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    items: [{ 
        name: {
>>>>>>> 2ec5c2df2c43bc97276c58ac51b470dd4f8500b9
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: Number,
    default: 1,
    required: true,
  },
  zipCode:{
    type: String,
    required: true,
  },
  date: {
    type: String,
    default:formattedDate,
  },
});

module.exports = orderSchema;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderId = require('./types/short-id');

const orderSchema = new Schema({ 
    orderId: {
        type: String, // 스키마 유형을 String으로 지정합니다.
        required: true, // 필요한 경우 다른 옵션도 추가합니다.
        default:orderId
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    customerAddress:{ //고객주소
        type: String,
        required: true,
      },
      quantity: {
        //수량
        type: Number,
        required: true,
      },
      price: {
        //가격
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    //합계
    type: Number,
    required: true,
  },
  orderStatus: {
    type: Number,
    default: 1,
    required: true,
  },
  date: {
    //구매날짜
    type: Date,
    default: Date.now,
  },
});

module.exports = orderSchema;

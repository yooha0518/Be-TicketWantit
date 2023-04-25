const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderId = require('./types/short-id');
const dayjs = require('dayjs');
const formattedDate = dayjs().format('YYYY-MM-DD');

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

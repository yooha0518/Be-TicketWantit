const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderId = require("./types/order-id");

const orderSchema = new Schema({
  orderId,
  userId: {
    type: String,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryPhoneNum: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      imgUrl: {
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
  zipCode: {
    type: String,
    required: true,
  },
  isReviewed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = orderSchema;

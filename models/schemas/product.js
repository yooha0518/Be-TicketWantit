const { Schema } = require('mongoose');
const shortId = require('./types/short-id');
const ProductSchema = new Schema({
  productId: shortId,
  category: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  speciesAge: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  desciption: {
    type: String,
    required: true,
  },
});

module.exports = ProductSchema;

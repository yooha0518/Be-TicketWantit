const {Schema} = require('mongoose');
const shortId = require('./types/short-id');
const ProductSchema = new Schema({
  shortId,
  category:{
    type:String,
    required:true,
  },
  productName:{
    type:String,
    required:true,
  },
  productId:{
    type:String,
    required:true,
  },
  productPrice:{
    type:Number,
    required:true,
  },
  viewingPlace:{
    type:String,
    required:true,
  },
  speciesAge:{
    type:Number,
    required:true,
  },
  desciption:{
    type:String,
    required:true,
  }
});

module.exports = ProductSchema;

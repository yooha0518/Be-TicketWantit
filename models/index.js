const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const OrderSchema = require('../models/schemas/order');
const ProductSchema = require('../models/schemas/product');
const RecommandedProductSchema = require('../models/schemas/recommandedProduct');
const CategorySchema = require('../models/schemas/category');
const reviewSchema = require('../models/schemas/review');

exports.User = mongoose.model('user', UserSchema);
exports.Order = mongoose.model('Order', OrderSchema);
exports.Product = mongoose.model('Product', ProductSchema);
exports.RecommandedProduct = mongoose.model(
  'RecommandedProduct',
  RecommandedProductSchema
);
exports.Category = mongoose.model('Category', CategorySchema);
exports.Review = mongoose.model('Review', reviewSchema);

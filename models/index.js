const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const OrderSchema = require('../models/schemas/order');
const ProductSchema = require('../models/schemas/product');

exports.User = mongoose.model('user', UserSchema);
exports.Order = mongoose.model('Order', OrderSchema);
exports.Product = mongoose.model('Product', ProductSchema);

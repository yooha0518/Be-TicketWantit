const mongoose = require('mongoose');
const UserSchema = require('../models/schemas/user');
const OrderSchema = require('../models/schemas/order');

exports.User = mongoose.model('user', UserSchema);
exports.Order = mongoose.model('Order',OrderSchema);
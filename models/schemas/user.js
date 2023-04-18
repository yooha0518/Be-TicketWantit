const { Schema } = require('mongoose');
const shortId = require('./types/short-id');
const UserSchema = new Schema(
	{
		shortId,
		userName: {
			type: String,
			required: true,
		},
		userEmail: {
			type: String,
			required: true,
		},
		userPassword: {
			type: String,
			required: true,
		},
		userNumber: {
			type: Number,
		},
		userAddress: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

module.exports = UserSchema;

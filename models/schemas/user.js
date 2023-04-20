const { Schema } = require('mongoose');
const shortId = require('./types/short-id');
const UserSchema = new Schema(
	{
		shortId,
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		Number: {
			type: Number,
		},
		Address: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = UserSchema;

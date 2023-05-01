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
		number: {
			type: String,
		},
		address: {
			type: String,
			required: false,
		},
		zipCode: {
			type: String,
			required: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isTempPassword: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = UserSchema;

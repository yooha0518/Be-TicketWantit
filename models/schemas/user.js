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
		phoneNumber: {
			type: String,
			required: false,
		},
		address: {
			type: String,
			required: false,
		},
		zipCode: {
			type: String,
			required: false,
		},
		profileImage: {
			type: String,
			default: 'http://34.64.112.166/defaultImage.png',
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isTempPassword: {
			type: Boolean,
			default: false,
		},
		state: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = UserSchema;

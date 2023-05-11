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
			select: false,
		},
		phoneNumber: {
			type: String,
			default: '',
		},
		address: {
			type: String,
			default: '',
		},
		zipCode: {
			type: String,
			default: '',
		},
		profileImage: {
			type: String,
			default: 'https://ticketwantit.shop:5000/defaultImage.png',
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
	{ timestamps: false }
);

module.exports = UserSchema;

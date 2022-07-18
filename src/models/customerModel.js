import { Schema, model, Types } from 'mongoose';

const drModel = new Schema(
	{
		name: {
			type: String,
			trim: true,
			max: 255,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			max: 2000,
			default: null,
			required: true,
			unique: true,
		},
		mobileNumber: {
			type: String,
			max: 255,
			required: true,
		},
		otp: {
			type: Number,
			required: true,
			default: null,
		},
		gender: {
			type: String,
			enum: ['MALE', 'FEMALE', 'NULL'],
			default: 'NULL',
		},

		fireBaseToken: {
			type: String,
			default: null,
		},
		profileImage: {
			type: String,
			default: null,
		},
		password: {
			type: String,
			default: null,
		},
		salt: {
			type: String,
			default: null,
		},
		addedBy: {
			type: Types.ObjectId,

			default: null,
		},

		isEnabled: {
			type: Boolean,
			required: true,
			default: false,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
		deletedBy: {
			type: Types.ObjectId,
			default: null,
		},
	},
	{ timestamps: true },
);

module.exports = new model('customer_details', drModel);

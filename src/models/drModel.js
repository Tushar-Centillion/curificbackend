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
		},
		gender: {
			type: String,
			enum: ['MALE', 'FEMALE', 'NULL'],
			default: 'NULL',
		},
		mainStream: {
			type: String,
			max: 255,
			default: null,
		},
		specialization: {
			type: String,
			max: 255,
			default: null,
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
		designation: {
			type: String,
			default: null,
		},
		timeSlot: {
			type: [Types.ObjectId],
			trim: true,
			max: 255,
			required: true,
			default: null,
			ref: 'timeSlotALL',
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

let autoPopulateLead = function (next) {
	this.populate('timeSlot');

	next();
};

drModel.pre('findOne', autoPopulateLead).pre('find', autoPopulateLead);

module.exports = new model('dr_details', drModel);

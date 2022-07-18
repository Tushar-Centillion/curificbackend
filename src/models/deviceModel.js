import { Schema, model, Types } from 'mongoose';

const deviceModal = new Schema(
	{
		deviceId: {
			type: String,
			required: true,
			unique: true,
		},
		deviceName: {
			type: String,
			required: true,
		},
		deviceType: {
			type: String,
			required: true,
		},
		deviceModal: {
			type: String,
			required: true,
		},
		treatment: {
			type: String,
			required: true,
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

module.exports = new model('deviceModal', deviceModal);

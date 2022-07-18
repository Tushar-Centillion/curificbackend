import { Schema, model, Types } from 'mongoose';

const timeSlotALL = new Schema(
	{
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
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

module.exports = new model('timeSlotALL', timeSlotALL);

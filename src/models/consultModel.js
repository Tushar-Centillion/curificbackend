import { Schema, model, Types } from 'mongoose';

const consultModel = new Schema(
	{
		name: {
			type: String,
			trim: true,
			max: 255,
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

module.exports = new model('consult_details', consultModel);

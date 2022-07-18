import { Schema, model, Types } from 'mongoose';

const languageModel = new Schema(
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

module.exports = new model('language_details', languageModel);

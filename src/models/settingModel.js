import { Schema, model, Types } from 'mongoose';

const settingModel = new Schema(
	{
		type: {
			type: String,
			enum: ['PRIVCYPOLICY', 'TERMSANDCONDITIONS', 'NULL'],
			default: 'NULL',
		},
		content: {
			type: String,
		},
		filedName: {
			type: String,
		},
		filedValue: {
			type: String,
		},
		filedType: {
			type: String,
		},
		isEnabled: {
			type: Boolean,
			required: true,
			default: true,
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

module.exports = new model('settingDetails', settingModel);

import { Schema, model, Types } from 'mongoose';
const healthSchema = new Schema(
	{
		profileImage: {
			type: String,
		},
		title: {
			type: String,
		},
		Description: {
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
module.exports = new model('health', healthSchema);

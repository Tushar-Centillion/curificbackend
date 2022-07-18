import { Schema, model, Types } from 'mongoose';

const notificationTypeModel = new Schema(
	{
		type: {
			type: String,
			trim: true,
			max: 255,
			required: true,
		},
		message: {
			type: String,
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

module.exports = new model('notificationType_details', notificationTypeModel);

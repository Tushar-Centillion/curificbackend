import { Schema, model, Types } from 'mongoose';

const packagesModel = new Schema(
	{
		name: {
			type: String,
			trim: true,
			max: 255,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		priceByMonth: {
			type: Number,
			required: true,
		},
		priceByYear: {
			type: Number,
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

module.exports = new model('subscriptionPackages', packagesModel);

import { Schema, model, Types } from 'mongoose';

const specialityModel = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: null,
		},
		price: {
			type: Number,
		},
		status: {
			type: String,
			enum: ['AVAILABLE', 'NOTAVAILABLE'],
			default: 'AVAILABLE',
		},
		time: {
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

module.exports = new model('dr_speciality', specialityModel);

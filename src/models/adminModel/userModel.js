import { Schema, model, Types } from 'mongoose';
const adminUserSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			max: 255,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			trim: true,
			max: 255,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			trim: true,
			max: 255,
			required: true,
		},
		salt: {
			type: String,
			trim: true,
			max: 255,
			required: true,
		},
		profileImage: {
			type: String,
			trim: true,
			max: 255,
			default: null,
		},
		firstLogin: {
			type: Boolean,
			default: true,
		},
		createdBy: {
			type: Types.ObjectId,
			trim: true,
			max: 2000,
			default: null,
		},
		role: {
			type: Types.ObjectId,
			trim: true,
			max: 255,
			required: true,
			ref: 'admin_role',
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

module.exports = new model('admin_User', adminUserSchema);

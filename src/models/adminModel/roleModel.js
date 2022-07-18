import { Schema, model, Types } from 'mongoose';

const adminRoleSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			max: 255,
			required: true,
			unique: true,
		},
		createdBy: {
			type: Types.ObjectId,
			trim: true,
			max: 2000,
			required: true,
			default: null,
			// ref: 'admin_Permissions',
		},
		permissions: {
			type: [Types.ObjectId],
			trim: true,
			max: 255,
			required: true,
			default: null,
			ref: 'admin_Permissions',
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

module.exports = new model('admin_role', adminRoleSchema);

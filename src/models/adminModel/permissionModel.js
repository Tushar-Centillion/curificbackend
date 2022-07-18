import { Schema, model, Types } from 'mongoose';

const PermissionSchema = new Schema(
	{
		path: {
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
			default: null,
			required: true,
			ref: 'admin_User',
		},
		displayName: {
			type: String,
			trim: true,
			max: 255,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = new model('admin_Permissions', PermissionSchema);

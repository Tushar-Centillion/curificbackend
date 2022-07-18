import { Mongoose, Types } from 'mongoose';

import { adminUserModel } from '../../models';

const userQuery = async (filter, projection) => {
	let query = {
		email: filter.email,
	};
	filter = filter ? query : filter;
	let isPopulate = filter.populate,
		data;
	delete filter.populate;
	if (isPopulate) {
		data = await adminUserModel
			.findOne(filter, projection)
			.populate({
				path: 'role',
				select: 'isEnabled deletedAt permissions name',
				populate: {
					path: 'permissions',
					select: 'displayName _id path',
				},
			})
			.lean();
	} else {
		data = await adminUserModel.findOne(filter, projection).lean();
	}
	return data;
};

const findAllQuery = async (query, userId) => {
	let { search, _id, limit, page, sortField, sortValue, email } = query;
	let sort = {};
	let whereClause = { deletedAt: null };
	if (sortField) {
		sort = {
			[sortField]: sortValue === 'ASC' ? 1 : -1,
		};
	} else {
		sort = {
			displayName: 1,
		};
	}
	if (search) {
		search = new RegExp(search, 'ig');
		whereClause = {
			$or: [{ displayName: search }, { path: search }],
		};
	}
	if (_id) {
		whereClause = { ...whereClause, _id };
	} else if (userId) {
		whereClause = { ...whereClause, _id: Types.ObjectId(userId) };
	}
	if (email) {
		whereClause = { ...whereClause, email };
	}
	const data = await adminUserModel
		.find(whereClause)
		.populate({
			path: 'role',
			select: 'isEnabled deletedAt permissions name',
			populate: {
				path: 'permissions',
				select: 'displayName _id path',
			},
		})
		.skip(page > 0 ? +limit * (+page - 1) : 0)
		.limit(+limit || 20)
		.sort(sort)
		.populate({
			path: 'permissions',
			model: 'admin_Permissions',
		});
	const totalCount = await adminUserModel.find(whereClause).countDocuments();
	return { data, totalCount };
};
const updateOneQuery = async (filter, update, projection) => {
	let options = { new: true, fields: { ...projection } };

	const data = await adminUserModel.findOneAndUpdate(filter, update, options);
	return data;
};

export default { userQuery, findAllQuery, updateOneQuery };

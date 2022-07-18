import { permissionsModel } from '../../models';
const findAllQuery = async (query) => {
	let { search, _id, limit, page, sortField, sortValue } = query;
	let sort = {};
	let whereClause = {};
	if (sortField) {
		sort = {
			[sortField]: sortValue === 'ASC' ? 1 : -1,
		};
	} else {
		sort = {
			createdAt: 1,
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
	}
	const data = await permissionsModel
		.find(whereClause)
		.skip(page > 0 ? +limit * (+page - 1) : 0)
		.limit(+limit || 20)
		.sort(sort);
	const totalCount = await permissionsModel.find(whereClause).countDocuments();
	return { data, totalCount };
};

const updateOneQuery = async (filter, update, projection) => {
	let options = { new: true, fields: { ...projection } };

	const data = await permissionsModel.findOneAndUpdate(filter, update, options);
	return data;
};
const deleteOneQuery = async (filter) => {
	const data = await permissionsModel.findByIdAndDelete(filter);
	return data;
};

const findByIdQuery = async (filter) => {
	const data = await permissionsModel.find({
		_id: {
			$in: filter,
		},
	});
	return filter.length === data.length;
};
const findWithoutPage = async (filter, project) => {
	const data = await permissionsModel.find(filter, project);
	return data;
};

const findWithSkip = async (filter, project, skip1) => {
	const data = await permissionsModel.find(filter, project).skip(skip1);
	return data;
};

export default {
	findAllQuery,
	updateOneQuery,
	deleteOneQuery,
	findByIdQuery,
	findWithoutPage,
	findWithSkip,
};

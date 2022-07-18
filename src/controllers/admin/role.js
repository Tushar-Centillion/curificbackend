import { roleModel } from '../../models';
import {
	adminUserService,
	permissionService,
	roleService,
} from '../../mongoServices';
import { CONSTANTS } from '../../constants';
import { errorLogger } from '../../utils';
import { isValidObjectId } from 'mongoose';
const {
	RESPONSE_MESSAGE: { ROLE, FAILED_RESPONSE, INVALID_OBJECTID },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const createRole = async (req, res) => {
	try {
		const {
			currentUser: { _id },
		} = req;
		const insertObj = {
			...req.body,
			createdBy: _id,
		};
		const findPermissions = await permissionService.findByIdQuery(
			req.body?.permissions,
		);
		if (findPermissions === false) {
			throw new Error('some permission is not available');
		}

		const saveRole = new roleModel(insertObj);
		const saveResponse = await saveRole.save();

		if (saveResponse) {
			return res.status(SUCCESS).send({
				success: true,
				msg: ROLE.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(ROLE.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const getRole = async (req, res) => {
	try {
		const { data, totalCount } = await roleService.findAllQuery(req.query);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: ROLE.GET_SUCCESS,
				total: totalCount,
				data,
			});
		} else {
			throw new Error(ROLE.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const updateRole = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		if (!isValidObjectId(id)) {
			throw new Error(INVALID_OBJECTID);
		}
		const findPermissions = await permissionService.findByIdQuery(
			req.body?.permissions,
		);
		if (findPermissions === false) {
			throw new Error('some permission is not available');
		}

		let filter = { _id: id };
		const { data } = await roleService.findAllQuery(filter);
		if (data.length === 1) {
			let update = { ...req.body };
			const updateData = await roleService.updateOneQuery(filter, update);
			if (updateData) {
				return res.status(SUCCESS).send({
					success: true,
					msg: ROLE.UPDATE_SUCCESS,
					data: updateData,
				});
			} else {
				throw new Error(ROLE.UPDATE_FAILED);
			}
		} else {
			throw new Error(ROLE.NOT_ROLE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const deleteRole = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		if (!isValidObjectId(id)) {
			throw new Error(INVALID_OBJECTID);
		}
		const checkExistingUser = await adminUserService.userQuery({
			role: id,
		});
		if (checkExistingUser) {
			throw new Error(ROLE.USER_AVAILABLE);
		}
		const data = await roleService.deleteOneQuery(id);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: ROLE.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(ROLE.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default { createRole, updateRole, deleteRole, getRole };

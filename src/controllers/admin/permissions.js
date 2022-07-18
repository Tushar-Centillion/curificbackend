import { permissionsModel } from '../../models';
import { permissionService, roleService } from '../../mongoServices';
import { CONSTANTS } from '../../constants';
import { errorLogger } from '../../utils';
import { isValidObjectId } from 'mongoose';
const {
	RESPONSE_MESSAGE: { PERMISSIONS, FAILED_RESPONSE, INVALID_OBJECTID },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createPermission = async (req, res) => {
	try {
		const {
			currentUser: { _id },
		} = req;

		const insertObj = {
			...req.body,
			createdBy: _id,
		};
		const savePermission = new permissionsModel(insertObj);
		const saveResponse = await savePermission.save();
		if (saveResponse) {
			const updateRole = await roleService.updatePermission(saveResponse._id);
			if (updateRole) {
				return res.status(SUCCESS).send({
					success: true,
					msg: PERMISSIONS.CREATE_SUCCESS,
					data: [],
				});
			} else {
				throw new Error(PERMISSIONS.CREATE_FAILED);
			}
		} else {
			throw new Error(PERMISSIONS.CREATE_FAILED);
		}
	} catch (error) {
		if (error.code === 11000) {
			error.message = PERMISSIONS.ALREADY_AVAILABLE;
		}
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const getPermission = async (req, res) => {
	try {
		const { data, totalCount } = await permissionService.findAllQuery(
			req.query,
		);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: PERMISSIONS.GET_SUCCESS,
				total: totalCount,
				data,
			});
		} else {
			throw new Error(PERMISSIONS.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const updatePermission = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		if (!isValidObjectId(id)) {
			throw new Error(INVALID_OBJECTID);
		}
		let filter = { _id: id };
		const { data } = await permissionService.findAllQuery(filter);
		if (data.length === 1) {
			let update = { ...req.body };
			const updateData = await permissionService.updateOneQuery(filter, update);
			return res.status(SUCCESS).send({
				success: true,
				msg: PERMISSIONS.UPDATE_SUCCESS,
				data: updateData,
			});
		} else {
			throw new Error(PERMISSIONS.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const deletePermission = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		if (!isValidObjectId(id)) {
			throw new Error(INVALID_OBJECTID);
		}
		const data = await permissionService.deleteOneQuery(id);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: PERMISSIONS.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(PERMISSIONS.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
export default {
	createPermission,
	getPermission,
	updatePermission,
	deletePermission,
};

import { packagesModel } from '../models';
import { CONSTANTS } from '../constants';

import { packagesService } from '../mongoServices';
import { errorLogger } from '../utils';
const {
	RESPONSE_MESSAGE: { PACKAGE },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const createPackage = async (req, res) => {
	try {
		const insertObj = {
			...req.body,
		};
		const savePackage = new packagesModel(insertObj);
		const savePackageResponse = await savePackage.save();
		if (savePackageResponse) {
			return res.status(SUCCESS).send({
				success: true,
				msg: PACKAGE.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(PACKAGE.PACKAGE_CREATE_FAILED);
		}
	} catch (err) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			success: false,
			msg: err.message || FAILED_RESPONSE,
			data: [],
		});
	}
};
const getPackage = async (req, res) => {
	try {
		const { data, totalCount } = await packagesService.findAllQuery(req.query);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: PACKAGE.GET_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(PACKAGE.GET_FAILED);
		}
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			success: false,
			msg: error.message || FAILED_RESPONSE,
			data: [],
		});
	}
};
const updatePackage = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const updateObj = {
			...req.body,
		};
		const projection = {};
		const updatePackageResponse = await packagesService.updateOneQuery(
			filter,
			updateObj,
			projection,
		);
		if (updatePackageResponse) {
			return res.status(SUCCESS).send({
				success: true,
				msg: PACKAGE.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(PACKAGE.UPDATE_FAILED);
		}
	} catch (err) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			success: false,
			msg: err.message || FAILED_RESPONSE,
			data: [],
		});
	}
};

const deletePackage = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const update = {
			isDeleted: true,
			deletedBy: req.currentUser._id,
		};
		const projection = {};
		const deletePackageResponse = await packagesService.updateOneQuery(
			filter,
			update,
			projection,
		);
		if (deletePackageResponse) {
			return res.status(SUCCESS).send({
				success: true,
				msg: PACKAGE.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(PACKAGE.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			success: false,
			msg: error.message || FAILED_RESPONSE,
			data: [],
		});
	}
};

export default {
	createPackage,
	getPackage,
	updatePackage,
	deletePackage,
};

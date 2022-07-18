import { settingService } from '../mongoServices';
import { settingModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, SETTING },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const addSettings = async (req, res) => {
	try {
		if (req.body) {
			const Model = await new settingModel(req.body);
			const saveResponse = await Model.save();
			if (saveResponse) {
				res.status(SUCCESS).json({
					success: true,
					message: SETTING.CREATE_SUCCESS,
					data: saveResponse,
				});
			} else {
				throw new Error(SETTING.CREATE_FAILED);
			}
		} else {
			throw new Error(SETTING.NAME_NOT_AVAILABLE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const getSetting = async (req, res) => {
	try {
		const { data, totalCount } = await settingService.findAllQuery(req.query);
		res.status(SUCCESS).send({
			message: SETTING.GET_SUCCESS,
			data,
			totalCount,
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).send({
			message: SETTING.GET_FAILED || FAILED_RESPONSE,
			data: [],
		});
	}
};
const updatesettings = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const update = {
			...req.body,
		};
		const projection = {};
		await settingService.updateOneQuery(filter, update, projection);
		res.status(SUCCESS).send({
			success: true,
			message: DEVICE.UPDATE_SUCCESS,
			data: [],
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).send({
			success: false,
			message: SETTING.UPDATE_FAILED || FAILED_RESPONSE,
			data: [],
		});
	}
};
const deleteSetting = async (req, res) => {
	try {
		const { id } = req.params;
		const filter = { _id: id };
		const update = { deletedAt: new Date(), deletedBy: req.currentUser._id };
		const projection = {};
		await settingService.updateOneQuery(filter, update, projection);
		return res.status(SUCCESS).send({
			success: true,
			message: SETTING.DELETE_SUCCESS,
			data: [],
		});
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			message: SETTING.DELETE_FAILED || FAILED_RESPONSE,
			success: false,
		});
	}
};

export default {
	addSettings,
	updatesettings,
	deleteSetting,
	getSetting,
};

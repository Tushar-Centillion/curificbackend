import { deviceModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { deviceService } from '../mongoServices';

const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, DEVICE },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createDevice = async (req, res) => {
	try {
		const { body } = req;
		const {
			deviceId,
			deviceType,
			deviceToken,
			deviceName,
			deviceModal,
			treatment,
		} = body;
		let savePayload = new deviceModel({
			deviceId,
			deviceType,
			deviceToken,
			deviceName,
			deviceModal,
			treatment,
		});

		await savePayload.save();
		res.status(SUCCESS).send({
			success: true,
			message: DEVICE.CREATE_SUCCESS,
			data: [],
		});
	} catch (error) {
		if (error.code === 11000) {
			errorLogger(error.message, req.originalUrl, req.ip);
			error.message = DEVICE.DELETE_ALREADY_AVAILABLE;
		}
		return res.status(FAILED).json({
			success: false,
			message: error.message || FAILED_RESPONSE,
		});
	}
};
const getDevice = async (req, res) => {
	try {
		const { data, totalCount } = await deviceService.findAllQuery(req.query);
		res.status(SUCCESS).send({
			message: DEVICE.GET_SUCCESS,
			data,
			totalCount,
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).send({
			message: FAILED_RESPONSE.DEVICE_GET_FAILED,
			data: [],
		});
	}
};
const updateDevice = async (req, res) => {
	try {
		const { body } = req;
		const { deviceName, deviceType, deviceModal, treatment } = body;
		const filter = { _id: req.params.id };
		const update = {
			deviceName,
			deviceType,
			deviceModal,
			treatment,
		};
		const projection = {};
		await deviceService.updateOneQuery(filter, update, projection);
		res.status(SUCCESS).send({
			success: true,
			message: DEVICE.UPDATE_SUCCESS,
			data: [],
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).send({
			message: FAILED_RESPONSE.DEVICE_UPDATE_FAILED,
			data: [],
		});
	}
};
const deleteDevice = async (req, res) => {
	try {
		console.log('req.params', req.params);
		const { id } = req.params;
		const filter = { _id: id };
		const update = { deletedAt: new Date(), deletedBy: req.currentUser._id };
		const projection = {};
		await deviceService.updateOneQuery(filter, update, projection);
		return res.status(SUCCESS).send({
			success: true,
			message: DEVICE.DELETE_SUCCESS,
			data: [],
		});
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).send({
			message: error.message || FAILED_RESPONSE,
			success: false,
		});
	}
};
export default {
	createDevice,
	getDevice,
	updateDevice,
	deleteDevice,
};

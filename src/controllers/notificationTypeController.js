import { notificationTypeModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, NOTIFICTIONTYPE },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createNotificationType = async (req, res) => {
	try {
		let { type, message } = req.body;

		let notificationTypeObj = {
			type: type,
			message: message,
		};
		const notificationType = new notificationTypeModel(notificationTypeObj);
		const saveNotificationType = await notificationType.save();
		if (saveNotificationType) {
			return res.status(SUCCESS).send({
				success: true,
				msg: NOTIFICTIONTYPE.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(NOTIFICTIONTYPE.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const updateNotificationType = async (req, res) => {
	try {
		const notificationType = await notificationTypeModel.updateOne(
			{ _id: req.params.id },
			{ message: req.body.message },
		);
		if (notificationType) {
			return res.status(SUCCESS).send({
				success: true,
				msg: NOTIFICTIONTYPE.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(NOTIFICTIONTYPE.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteNotificationType = async (req, res) => {
	try {
		const notificationType = await notificationTypeModel.updateOne(
			{ _id: req.params.id },
			{ deletedAt: new Date() },
		);
		if (notificationType) {
			return res.status(SUCCESS).send({
				success: true,
				msg: NOTIFICTIONTYPE.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(NOTIFICTIONTYPE.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const listAllNotificationType = async (req, res) => {
	try {
		let whereClause = {};
		let _id = req.params.id;
		if (_id) {
			whereClause = { ...whereClause, _id };
		}
		let allNotificationType = await notificationTypeModel.find(whereClause);
		if (allNotificationType) {
			return res.status(SUCCESS).send({
				success: true,
				msg: NOTIFICTIONTYPE.GET_SUCCESS,
				data: allNotificationType,
			});
		} else {
			throw new Error(NOTIFICTIONTYPE.GET_FAILED);
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
	createNotificationType,
	updateNotificationType,
	deleteNotificationType,
	listAllNotificationType,
};

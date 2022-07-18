import { healthModel } from '../models';
import { healthService } from '../mongoServices';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { fileUpload } from '../utils';

const {
	RESPONSE_MESSAGE: { HEALTH_ARTICLE, FAILED_RESPONSE },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;
const createHealthArticle = async (req, res) => {
	try {
		let payload = {
			...req.body,
			profileImage: req.file.filename,
		};
		const Model = new healthModel(payload);
		const saveResponse = await Model.save();
		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				message: HEALTH_ARTICLE.CREATE_SUCCESS,
				data: [],
			});
		}
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const getHealthArticle = async (req, res) => {
	try {
		let { data, totalCount } = await healthService.findAllQuery(req.query);
		if (data) {
			res.status(SUCCESS).json({
				success: true,
				message: HEALTH_ARTICLE.GET_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(HEALTH_ARTICLE.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		console.log('error', error);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteHealthArticle = async (req, res) => {
	try {
		const { id } = req.params;
		let filter = { _id: id },
			updateData = {
				isEnabledL: false,
				deletedAt: new Date(),
				deletedBy: req.currentUser._id,
			};
		const response = await healthService.updateOne(filter, updateData);
		if (response) {
			res.status(SUCCESS).json({
				success: true,
				message: HEALTH_ARTICLE.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(HEALTH_ARTICLE.DELETE_FAILED);
		}
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const updateHealthArticle = async (req, res) => {
	try {
		const { id } = req.params,
			filter = { _id: id };

		const { data } = await healthService.findAllQuery(filter);
		if (data) {
			let payload = {
				...req.body,
			};
			if (req.file) {
				fileUpload.removeFile(data[0].profileImage);

				payload = {
					profileImage: req.file.path,
				};
			}
			const response = healthService.updateOneQuery(filter, payload);
			if (response) {
				res.status(SUCCESS).json({
					success: true,
					message: HEALTH_ARTICLE.UPDATE_SUCCESS,
					data: [],
				});
			} else {
				throw new Error(HEALTH_ARTICLE.UPDATE_FAILED);
			}
		} else {
			throw new Error(HEALTH_ARTICLE.NOT_AVAILABLE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

export default {
	createHealthArticle,
	getHealthArticle,
	deleteHealthArticle,
	updateHealthArticle,
};

import { specialityModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import fs from 'fs';
import { specialityService } from '../mongoServices';
import { uploadFile, deleteFile } from '../utils/uploadFileintoAws';
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, SPECIALITY },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createSpeciality = async (req, res) => {
	try {
		let { name, price, status, time } = req.body;
		// uploading to AWS S3
		const result = await uploadFile(req.file);
		await unlinkFile(req.file.path);
		let SpecialityObj = {
			name: name,
			price: price,
			status: status,
			time: time,
			image: result.key,
		};
		const Speciality = new specialityModel(SpecialityObj);
		const saveSpeciality = await Speciality.save();
		if (saveSpeciality) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.CREATE_SUCCESS,
				data: saveSpeciality,
			});
		} else {
			throw new Error(SPECIALITY.CREATE_FAILED);
		}
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const updateSpeciality = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, time, price, status } = req.body;
		let filter = { _id: id };
		const { data } = await specialityService.findAllQuery(filter);
		if (!data) {
			throw new Error(SPECIALITY.UPDATE_FAILED);
		}
		let result;
		if (req.file) {
			let img = data[0].image.split('/');
			await deleteFile(img[1]);
			result = await uploadFile(req.file);
			await unlinkFile(req.file.path);
		}
		let image = result ? result.key : data[0].image;
		let updateData = {
			name,
			time,
			price,
			status,
			image,
		};
		const updateSp = await specialityService.updateOneQuery(filter, updateData);
		if (updateSp) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.UPDATE_SUCCESS,
				data: updateSp,
			});
		} else {
			throw new Error(SPECIALITY.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteSpeciality = async (req, res) => {
	try {
		const { id } = req.params;
		let filter = { _id: id },
			updateData = {
				deletedAt: new Date(),
				deletedBy: req.currentUser._id,
			};
		await specialityService.updateOneQuery(filter, updateData);

		if (deleteSpeciality) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(SPECIALITY.DELETE_FAILED);
		}
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const listAllSpeciality = async (req, res) => {
	try {
		const { data, totalCount } = await specialityService.findAllQuery(
			req.query,
		);
		if (data) {
			return res.status(SUCCESS).send({
				success: true,
				msg: SPECIALITY.LIST_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(SPECIALITY.LIST_FAILED);
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
	createSpeciality,
	updateSpeciality,
	deleteSpeciality,
	listAllSpeciality,
};

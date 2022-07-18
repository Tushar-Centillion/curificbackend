import { timeSlotModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';
import { timeSlotService, drService } from '../mongoServices';
const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, TIME_SLOT },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createTimeSlot = async (req, res) => {
	try {
		let { startTime, endTime } = req.body;
		let TimeSlotObj = {
			startTime,
			endTime,
		};
		const TimeSlot = new timeSlotModel(TimeSlotObj);
		const saveTimeSlot = await TimeSlot.save();
		if (saveTimeSlot) {
			return res.status(SUCCESS).send({
				success: true,
				msg: TIME_SLOT.CREATE_SUCCESS,
				data: saveTimeSlot,
			});
		} else {
			throw new Error(TIME_SLOT.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const getTimeSlots = async (req, res) => {
	try {
		const { data, totalCount } = await timeSlotService.findAllQuery(req.query);
		if (getTimeSlots) {
			return res.status(SUCCESS).send({
				success: true,
				msg: TIME_SLOT.GET_SUCCESS,
				data,
				totalCount,
			});
		} else {
			throw new Error(TIME_SLOT.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const updateTimeSlot = async (req, res) => {
	try {
		const { startTime, endTime } = req.body;
		const filter = { _id: req.params.id };
		const update = {
			endTime,
			startTime,
		};
		const projection = {};
		const updateSlot = await timeSlotService.updateOneQuery(
			filter,
			update,
			projection,
		);
		if (updateSlot) {
			return res.status(SUCCESS).send({
				success: true,
				msg: TIME_SLOT.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(TIME_SLOT.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteTimeSlot = async (req, res) => {
	try {
		const { id } = req.params;
		let filter = { _id: id };

		const deleteSlot = await timeSlotService.updateOneQuery(filter);
		if (deleteSlot) {
			return res.status(SUCCESS).send({
				success: true,
				msg: TIME_SLOT.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(TIME_SLOT.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};
const assignTimeSlot = async (req, res) => {
	try {
		let { timeSlot, drId } = req.body;
		let filter = { _id: drId };
		let { data } = await drService.findAllQuery(filter);

		if (data) {
			let update = {
				timeSlot,
			};
			let projection = {};
			let updateDr = await drService.updateOneQuery(filter, update, projection);
			console.log('updateDr', updateDr);
			if (updateDr) {
				return res.status(SUCCESS).send({
					success: true,
					msg: TIME_SLOT.ASSIGN_SUCCESS,
					data: [],
				});
			} else {
				throw new Error(TIME_SLOT.ASSIGN_FAILED);
			}
		} else {
			throw new Error(TIME_SLOT.ASSIGN_FAILED);
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

export default {
	createTimeSlot,
	getTimeSlots,
	updateTimeSlot,
	deleteTimeSlot,
	assignTimeSlot,
};

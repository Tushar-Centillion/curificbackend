import { consultModel, languageModel } from '../models';
import { CONSTANTS } from '../constants';
import { errorLogger } from '../utils';

const {
	RESPONSE_MESSAGE: { FAILED_RESPONSE, CONSULT, LANGUAGE },
	STATUS_CODE: { SUCCESS, FAILED },
} = CONSTANTS;

const createConsult = async (req, res) => {
	try {
		let { name } = req.body;

		let consultObj = {
			name: name,
		};
		const consult_details = new consultModel(consultObj);
		const saveConsultDetails = await consult_details.save();
		if (saveConsultDetails) {
			return res.status(SUCCESS).send({
				success: true,
				msg: CONSULT.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(CONSULT.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const createLanguage = async (req, res) => {
	try {
		let { name } = req.body;

		let languageObj = {
			name: name,
		};
		const language_details = new languageModel(languageObj);
		const saveLanguageDetails = await language_details.save();
		if (saveLanguageDetails) {
			return res.status(SUCCESS).send({
				success: true,
				msg: LANGUAGE.CREATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(LANGUAGE.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const getAllLanguage = async (req, res) => {
	try {
		let whereClause = {};
		let _id = req.params.id;
		if (_id) {
			whereClause = { ...whereClause, _id };
		}
		let allLanguage = await languageModel.find(whereClause);
		if (allLanguage) {
			return res.status(SUCCESS).send({
				success: true,
				msg: LANGUAGE.GET_SUCCESS,
				data: allLanguage,
			});
		} else {
			throw new Error(LANGUAGE.GET_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const getAllConsult = async (req, res) => {
	try {
		let whereClause = {};
		let _id = req.params.id;
		if (_id) {
			whereClause = { ...whereClause, _id };
		}
		let allConsult = await consultModel.find(whereClause);
		if (allConsult) {
			return res.status(SUCCESS).send({
				success: true,
				msg: CONSULT.GET_SUCCESS,
				data: allConsult,
			});
		} else {
			throw new Error(CONSULT.CREATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const updateLanguage = async (req, res) => {
	try {
		const language = await languageModel.updateOne(
			{ _id: req.params.id },
			{ name: req.body.name },
		);
		if (language) {
			return res.status(SUCCESS).send({
				success: true,
				msg: LANGUAGE.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(LANGUAGE.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const updateConsult = async (req, res) => {
	try {
		const consult = await consultModel.updateOne(
			{ _id: req.params.id },
			{ name: req.body.name },
		);
		if (consult) {
			return res.status(SUCCESS).send({
				success: true,
				msg: CONSULT.UPDATE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(CONSULT.UPDATE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteConsult = async (req, res) => {
	try {
		const consult = await consultModel.updateOne(
			{ _id: req.params.id },
			{ deletedAt: new Date(), deletedBy: req.user.id },
		);
		if (consult) {
			return res.status(SUCCESS).send({
				success: true,
				msg: CONSULT.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(CONSULT.DELETE_FAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILED_RESPONSE,
		});
	}
};

const deleteLanguage = async (req, res) => {
	try {
		const language = await languageModel.updateOne(
			{ _id: req.params.id },
			{ deletedAt: new Date(), deletedBy: req.user.id },
		);
		if (language) {
			return res.status(SUCCESS).send({
				success: true,
				msg: LANGUAGE.DELETE_SUCCESS,
				data: [],
			});
		} else {
			throw new Error(LANGUAGE.DELETE_FAILED);
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
	createConsult,
	createLanguage,
	getAllLanguage,
	getAllConsult,
	updateLanguage,
	updateConsult,
	deleteLanguage,
	deleteConsult,
};

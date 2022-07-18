import Joi from 'joi';

import { validateRequest } from '../middleware';

function addDeviceValidator(req, res, next) {
	const schema = Joi.object({
		deviceId: Joi.string().required(),
		deviceName: Joi.string().required(),
		deviceType: Joi.string().required(),
		deviceModal: Joi.string().required(),
		treatment: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}

export default {
	addDeviceValidator,
};

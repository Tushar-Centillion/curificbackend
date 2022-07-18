import Joi from 'joi';

import { validateRequest } from '../middleware';

function permissionsValidator(req, res, next) {
	const schema = Joi.object({
		path: Joi.string().required(),
		displayName: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function roleValidator(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		permissions: Joi.array().required(),
	});
	validateRequest(req, res, next, schema);
}

function adminUserValidation(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		role: Joi.string().required(),
		profileImage: Joi.string().optional(),
		mobileNumber: Joi.string().optional(),
	});
	validateRequest(req, res, next, schema);
}
function adminUserLoginValidation(req, res, next) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function adminUserPasswordChangeValidation(req, res, next) {
	const schema = Joi.object({
		oldPassword: Joi.string().required(),
		newPassword: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function forgetPasswordValidation(req, res, next) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
	});
	validateRequest(req, res, next, schema);
}
function resetPasswordValidation(req, res, next) {
	const schema = Joi.object({
		token: Joi.string().required(),
		newPassword: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function drCreateValidator(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		mobileNumber: Joi.string().required(),
		password: Joi.string().required(),
		type: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function VerifyDrValidator(req, res, next) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		otp: Joi.number().required(),
		type: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}
function specialityCreateValidator(req, res, next) {
	const schema = Joi.object({
		name: Joi.string().required(),
		price: Joi.number().required(),
		time: Joi.string().required(),
		// image: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}

function notificationTypeCreate(req, res, next) {
	const schema = Joi.object({
		type: Joi.string().required(),
		message: Joi.string().required(),
	});
	validateRequest(req, res, next, schema);
}

function addDeviceValidatorData(req, res, next) {
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
	permissionsValidator,
	roleValidator,
	adminUserValidation,
	adminUserLoginValidation,
	adminUserPasswordChangeValidation,
	forgetPasswordValidation,
	resetPasswordValidation,
	drCreateValidator,
	VerifyDrValidator,
	specialityCreateValidator,
	notificationTypeCreate,
	addDeviceValidatorData,
};

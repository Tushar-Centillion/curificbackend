import { adminUserService } from '../mongoServices';
import { CONSTANTS } from '../constants';
import { errorLogger, jwtVerify } from '../utils';
import e from 'express';
const {
	RESPONSE_MESSAGE: { AUTH_MIDDLEWARE },
	STATUS_CODE: { UNAUTHORIZED },
} = CONSTANTS;
const JwtAuthorization = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error(AUTH_MIDDLEWARE.TOKEN_NOTFOUND);
		const token =
			authorization && authorization.startsWith('Bearer ')
				? authorization.slice(7, authorization.length)
				: authorization;
		const verifyToken = jwtVerify(token);

		if (!verifyToken) throw new Error(AUTH_MIDDLEWARE.TOKEN_INVALID);

		const currentDate = Math.floor(Date.now() / 1000);

		if (currentDate > verifyToken?.exp) {
			throw new Error(AUTH_MIDDLEWARE.SESSION_EXPIRY);
		}
		const { data } = await adminUserService.findAllQuery({
			_id: verifyToken.sub,
		});

		if (data.length == 1) {
			if (
				data[0].role.name === 'DEVELOPER' ||
				data[0].role.name === 'SUPER_USER'
			) {
				req.currentUser = data[0];
				next();
			} else {
				const endpoint = req.route.path;
				let splitBaseUrl = req.baseUrl.split('/');
				const baseUrl = splitBaseUrl[splitBaseUrl.length - 1];
				let urlPath = baseUrl + endpoint;

				const permissions = data[0]?.role?.permissions;

				const checkPermissions = permissions
					.map((x) => x.path === urlPath)
					.indexOf(true);

				if (checkPermissions === -1) {
					throw new Error(AUTH_MIDDLEWARE.UNAUTHORIZED);
				} else {
					req.currentUser = data[0];
					next();
				}
			}
		} else {
			throw new Error(AUTH_MIDDLEWARE.UNAUTHORIZED);
		}
	} catch (error) {
		console.log('error', error);
		errorLogger(error.message, req.originalUrl, req.ip);
		return res
			.status(UNAUTHORIZED)
			.send({ success: false, message: error.message });
	}
};

export default JwtAuthorization;

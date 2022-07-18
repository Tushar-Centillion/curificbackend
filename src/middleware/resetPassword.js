import { adminUserService } from '../mongoServices';
import { CONSTANTS } from '../constants';
import { errorLogger, jwtVerify } from '../utils';
const {
	RESPONSE_MESSAGE: { AUTH_MIDDLEWARE },
	STATUS_CODE: { UNAUTHORIZED },
} = CONSTANTS;
const resetPassword = async (req, res, next) => {
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
			email: verifyToken.sub,
		});
		if (data.length == 1) {
			req.currentUser = data[0];
			next();
		} else {
			throw new Error(AUTH_MIDDLEWARE.UNAUTHORIZED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res
			.status(UNAUTHORIZED)
			.send({ success: false, message: error.message });
	}
};

export default resetPassword;

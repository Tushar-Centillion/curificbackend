import logger from './logger';

const errorLogger = (error, requestURL, requestIp) => {
	const errorObj = {
		message: error,
		currentTime: new Date().toLocaleString(),
		requestURL,
		requestIp,
	};
	logger.errorLog.error(errorObj);
};

export default errorLogger;

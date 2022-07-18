import { verify } from 'jsonwebtoken';
import { ENV } from '../constants';
const {
	JWT: { ACCOUNT_ACTIVATION },
} = ENV;

const verifyJWTToken = (token) => {
	const verifyToken = verify(token, ACCOUNT_ACTIVATION);
	return verifyToken;
};

export default verifyJWTToken;

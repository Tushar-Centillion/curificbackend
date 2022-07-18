import { sign } from 'jsonwebtoken';
import { ENV } from '../constants';

const secret = ENV.JWT.SECRET;

const generateJWTToken = (id, type) => {
	const token = sign({ sub: id, type }, secret, { expiresIn: '7d' });
	return token;
};

export default generateJWTToken;

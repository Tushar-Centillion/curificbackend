import { hash, genSalt } from 'bcrypt';

const saltRounds = 10;
const hashPassword = async (password) => {
	// Generate a salt at level 10 strength
	const salt = await genSalt(saltRounds);
	const hashedPassword = await hash(password, salt);
	return { hashedPassword, salt };
};

export default hashPassword;

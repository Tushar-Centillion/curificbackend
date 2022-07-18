import { generate } from 'generate-password';

const generatePassword = () => {
	return generate({
		length: 10,
		numbers: true,
	});
};

export default generatePassword;

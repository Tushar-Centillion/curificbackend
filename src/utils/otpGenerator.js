const otpGenerator = () => {
	return Math.floor(Math.random() * 10000 + 1);
};

export default otpGenerator;

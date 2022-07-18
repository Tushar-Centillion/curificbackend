import { sendMail } from './';
import { ENV } from '../constants';

const {
	SENDGRID: { EMAIL },
} = ENV;
const sendRegisterEmail = async (email, otp, name) => {
	const html = `
					Hello ${name} ,
						Otp: ${otp}`;

	// Send Confirm Account Email
	const sendEmail = await sendMail(email, EMAIL, 'register with curific', html);

	if (sendEmail[0].statusCode != 202) {
		throw new Error('mail is not send');
	} else return sendEmail;
};

export default {
	sendRegisterEmail,
};

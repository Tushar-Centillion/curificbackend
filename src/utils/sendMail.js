import sgMail from '@sendgrid/mail';
import { ENV } from '../constants';
const {
	SENDGRID: { API_KEY },
} = ENV;
sgMail.setApiKey(API_KEY);
const sendMail = async (to, from, subject, html) => {
	try {
		const sendMailObj = {
			to,
			from,
			subject,
			html,
		};

		const sendEmail = await sgMail.send(sendMailObj);

		return sendEmail;
	} catch (error) {
		if (error.response) {
			return error.response.body;
		}
	}
};

export default sendMail;

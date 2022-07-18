import { set, connect, connection } from 'mongoose';
require('dotenv').config({ path: 'src/config/.env' });
import { redBright, greenBright, yellowBright } from 'chalk';
import { ENV } from '../constants';
const {
	DATABASE: { MONGO_URI, MONGO_DB_NAME },
} = ENV;

// Database Name & URL
export const CONNECTION_URL = MONGO_URI;
export const DATABASE_NAME = MONGO_DB_NAME;

const connectMongoDB = async () => {
	try {
		set('useCreateIndex', true);

		//for making use of findOneAndUpdate else it will not work
		set('useFindAndModify', false);

		//Connection establishment
		connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		const db = connection;

		// Event Listener
		db.on('disconnected', (_err) => {
			console.error(redBright(`MongoDB-> disconnected: ${DATABASE_NAME}`));
			connectMongoDB();
		});

		db.on('reconnected', (_err) => {
			console.info(yellowBright(`MongoDB-> reconnected: ${DATABASE_NAME}`));
		});

		db.on('error', (error) => {
			console.error(redBright('Error occurred in db connection', error));
		});

		db.on('open', () => {
			console.info(greenBright(`DB Connection with established successfully.`));
		});
	} catch (error) {
		console.error(redBright('Error occurred in db connection', error));
		process.exit(-1);
	}
};

connectMongoDB();

export default connectMongoDB;

import multer from 'multer';
import { unlinkSync } from 'fs';

require('dotenv').config({ path: '.env' });

// upload file path

const removeFile = (file) => {
	try {
		const deleteFile = `${process.env.FILE}/${file}`;
		unlinkSync(deleteFile, (err) => {
			throw new Error(err);
		});
		return removeFile;
	} catch (err) {
		return err;
	}
};

// configure multer storage
const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, `${process.env.FILE}/`);
	},
	filename: (_req, file, cb) => {
		let filename = file.originalname;

		cb(null, Date.now() + '_' + filename);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (_req, file, cb) => {
		try {
			let error = 'Error: Allowed only .JPEG, .JPG, .PNG';
			const { mimetype } = file;
			if (
				mimetype == 'image/jpeg' ||
				mimetype === 'image/png' ||
				mimetype == 'image/jpg'
			) {
				cb(null, true);
			} else {
				cb(error, false);
			}
		} catch (error) {
			return cb(null, false);
		}
	},
});

export default { upload, storage, removeFile };

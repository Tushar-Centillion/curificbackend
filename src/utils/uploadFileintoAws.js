require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
import { ENV } from '../constants';
const {
	S3: { BUCKET_NAME, AWS_BUCKET_REGION, ACCESS_KEY_ID, AWS_SECRET_KEY },
} = ENV;

const bucketName = BUCKET_NAME;
const region = AWS_BUCKET_REGION;
const accessKeyId = ACCESS_KEY_ID;
const secretAccessKey = AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// UPLOAD FILE TO S3
function uploadFile(file) {
	console.log('file', file);
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
}

// DOWNLOAD FILE FROM S3
function getFileStream(fileKey) {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return s3.getObject(downloadParams).createReadStream();
}
//DELETE FILE FORM S3
async function deleteFile(filePath) {
	let params = { Bucket: bucketName, Key: filePath };
	try {
		await s3.headObject(params).promise();
		try {
			console.log('file deleted Successfully');
		} catch (err) {
			console.log('ERROR in file Deleting : ' + JSON.stringify(err));
		}
	} catch (err) {
		console.log('File not Found ERROR : ' + err.code);
	}
}
module.exports = { uploadFile, getFileStream, deleteFile };

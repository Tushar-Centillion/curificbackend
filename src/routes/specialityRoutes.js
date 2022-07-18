import express from 'express';
import { validator } from '../validation';
import { specialityController } from '../controllers';
import { authMiddleware } from '../middleware';
import { fileUpload } from '../utils';

const router = express.Router();

router.post(
	'/create',
	authMiddleware,
	fileUpload.upload.single('image'),
	validator.specialityCreateValidator,
	specialityController.createSpeciality,
);

router.post(
	'/update/:id',
	authMiddleware,
	fileUpload.upload.single('image'),
	specialityController.updateSpeciality,
);
router.delete(
	'/delete/:id',
	authMiddleware,
	specialityController.deleteSpeciality,
);
router.get('/get', authMiddleware, specialityController.listAllSpeciality);
module.exports = router;

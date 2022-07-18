import express from 'express';
import { fileUpload } from '../utils';
import { healthController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post(
	'/create',
	authMiddleware,
	fileUpload.upload.single('profileImage'),
	healthController.createHealthArticle,
);
router.delete(
	'/delete/:id',
	authMiddleware,
	healthController.deleteHealthArticle,
);
router.get('/get', authMiddleware, healthController.getHealthArticle);
router.put(
	'/update/:id',
	authMiddleware,
	fileUpload.upload.single('profileImage'),
	healthController.updateHealthArticle,
);

module.exports = router;

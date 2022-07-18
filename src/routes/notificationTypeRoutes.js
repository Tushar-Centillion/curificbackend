import express from 'express';
import { notificationTypeController } from '../controllers';
import { authMiddleware } from '../middleware';
import { validator } from '../validation';
const router = express.Router();

router.post(
	'/create',
	authMiddleware,
	validator.notificationTypeCreate,
	notificationTypeController.createNotificationType,
);
router.put(
	'/update/:id',
	authMiddleware,
	notificationTypeController.updateNotificationType,
);
router.get(
	'/list',
	authMiddleware,
	notificationTypeController.listAllNotificationType,
);
router.delete(
	'/delete/:id',
	authMiddleware,
	notificationTypeController.deleteNotificationType,
);

module.exports = router;

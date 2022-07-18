import express from 'express';
import { deviceController } from '../controllers';
import { authMiddleware } from '../middleware';
import { validator } from '../validation';
const router = express.Router();

router.get('/get', authMiddleware, deviceController.getDevice);
router.post(
	'/create',
	authMiddleware,
	validator.addDeviceValidatorData,

	deviceController.createDevice,
);
router.put('/update/:id', authMiddleware, deviceController.updateDevice);
router.delete('/delete/:id', authMiddleware, deviceController.deleteDevice);

module.exports = router;

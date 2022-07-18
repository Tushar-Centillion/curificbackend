import express from 'express';
import { validator } from '../../validation';
import { authMiddleware } from '../../middleware';
import { permissionsController } from '../../controllers';
const router = express.Router();

// call_back CRUD Routes
router.post(
	'/create',
	validator.permissionsValidator,
	authMiddleware,
	permissionsController.createPermission,
);

router.get('/get', authMiddleware, permissionsController.getPermission);
router.put(
	'/update/:id',
	validator.permissionsValidator,
	authMiddleware,
	permissionsController.updatePermission,
);
router.delete(
	'/delete/:id',
	authMiddleware,
	permissionsController.deletePermission,
);

module.exports = router;

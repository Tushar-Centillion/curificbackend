import express from 'express';
import { validator } from '../../validation';
import { authMiddleware } from '../../middleware';
import { roleController } from '../../controllers';
const router = express.Router();

// Role CRUD Routes
router.post(
	'/create',
	validator.roleValidator,
	authMiddleware,
	roleController.createRole,
);

router.get('/get', authMiddleware, roleController.getRole);
router.put(
	'/update/:id',
	validator.roleValidator,
	authMiddleware,
	roleController.updateRole,
);
router.delete('/delete/:id', authMiddleware, roleController.deleteRole);

module.exports = router;

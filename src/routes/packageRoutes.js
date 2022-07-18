import express from 'express';
import { packageController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.get('/get', authMiddleware, packageController.getPackage);
router.post('/create', authMiddleware, packageController.createPackage);
router.put('/update/:id', authMiddleware, packageController.updatePackage);
router.delete('/delete/:id', authMiddleware, packageController.deletePackage);

module.exports = router;

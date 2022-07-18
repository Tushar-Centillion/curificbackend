import express from 'express';
import { validator } from '../validation';
import { drController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();
router.post('/create', validator.drCreateValidator, drController.createDr);
router.post('/verify-otp', validator.VerifyDrValidator, drController.verifyOtp);
router.post('/update', drController.updateProfile);
router.post('/delete/:id', drController.deleteDr);
router.get('/dr/list', drController.listDr);
router.get('/customer/list', drController.ListCustomer);
router.delete('/customer/delete/:id', authMiddleware, drController.deleteDr);

module.exports = router;

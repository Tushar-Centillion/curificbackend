import express from 'express';

import { timeSlotController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();
router.post('/create', authMiddleware, timeSlotController.createTimeSlot);
router.get('/get', authMiddleware, timeSlotController.getTimeSlots);
router.put('/update/:id', authMiddleware, timeSlotController.updateTimeSlot);
router.delete('/delete/:id', authMiddleware, timeSlotController.deleteTimeSlot);
router.put('/assign', authMiddleware, timeSlotController.assignTimeSlot);
module.exports = router;

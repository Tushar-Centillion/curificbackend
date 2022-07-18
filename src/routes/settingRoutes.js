import express from 'express';
import { settingController } from '../controllers';
import { authMiddleware } from '../middleware';
const router = express.Router();

router.post('/create', authMiddleware, settingController.addSettings);
router.get('/get', authMiddleware, settingController.getSetting);
router.put('/update/:id', authMiddleware, settingController.updatesettings);
router.delete('/delete/:id', authMiddleware, settingController.deleteSetting);

module.exports = router;

import express from 'express';
import { commonController } from '../controllers';
const router = express.Router();

router.post('/createConsult', commonController.createConsult);
router.post('/createLanguage', commonController.createLanguage);

router.get('/getAllLanguage/:id?', commonController.getAllLanguage);
router.get('/getAllConsult/:id?', commonController.getAllConsult);

router.post('/updateLanguage/:id', commonController.updateLanguage);
router.post('/updateConsult/:id', commonController.updateConsult);

router.delete('/deleteLanguage/:id', commonController.deleteLanguage);
router.delete('/deleteConsult/:id', commonController.deleteConsult);

module.exports = router;

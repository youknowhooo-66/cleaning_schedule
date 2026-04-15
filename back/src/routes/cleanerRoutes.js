import express from 'express';
import { getAllCleaners, createCleaner } from '../controllers/cleanerController.js';

const router = express.Router();

router.get('/', getAllCleaners);
router.post('/', createCleaner);

export default router;

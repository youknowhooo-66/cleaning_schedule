import express from 'express';
import { getAllCleaners, createCleaner, updateCleaner, deleteCleaner } from '../controllers/cleanerController.js';

const router = express.Router();

router.get('/', getAllCleaners);
router.post('/', createCleaner);
router.put('/:id', updateCleaner);
router.delete('/:id', deleteCleaner);

export default router;

import express from 'express';
import {
  getAllBookings,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getAllBookings);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.patch('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);

export default router;

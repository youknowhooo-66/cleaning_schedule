import prisma from '../config/prisma.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { cleaner: true },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBooking = async (req, res) => {
  const { clientName, clientEmail, serviceDate, notes, cleanerId } = req.body;
  try {
    const bookingDate = new Date(serviceDate);

    // Validate if cleaner already has a booking at this date
    if (cleanerId) {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          cleanerId: parseInt(cleanerId),
          serviceDate: bookingDate,
          status: { not: 'CANCELLED' }
        }
      });

      if (existingBooking) {
        return res.status(400).json({ error: 'Profissional já possui um agendamento nesta data/horário' });
      }
    }

    const newBooking = await prisma.booking.create({
      data: {
        clientName,
        clientEmail,
        serviceDate: bookingDate,
        notes,
        cleanerId: cleanerId ? parseInt(cleanerId) : null,
      },
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { clientName, clientEmail, serviceDate, notes, cleanerId, status } = req.body;
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        clientName,
        clientEmail,
        serviceDate: new Date(serviceDate),
        notes,
        cleanerId: cleanerId ? parseInt(cleanerId) : null,
        status,
      },
    });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import prisma from '../config/prisma.js';

export const getAllCleaners = async (req, res) => {
  try {
    const cleaners = await prisma.cleaner.findMany({
      include: { bookings: true },
    });
    res.json(cleaners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCleaner = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newCleaner = await prisma.cleaner.create({
      data: { name, email, phone },
    });
    res.status(201).json(newCleaner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

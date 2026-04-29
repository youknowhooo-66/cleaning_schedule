import request from 'supertest';
import app from '../app.js';
import bcrypt from 'bcrypt';
import { signAccessToken } from '../utils/jwt.js';

// Import the prisma instance from config
import prisma from '../config/prisma.js';

const setupDatabase = async () => {
  await prisma.booking.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.cleaner.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.usuario.create({
    data: {
      nome: 'Auth User',
      email: 'auth@example.com',
      senha: hashedPassword,
      tipoUsuario: 'ADMIN',
    },
  });

  const token = signAccessToken({ userId: user.id, tipoUsuario: user.tipoUsuario });
  return { user, token };
};

describe('Booking Management', () => {
  let authToken;
  let testBookingId;
  let testCleanerId;
  let authUserId;

  beforeAll(async () => {
    await prisma.booking.deleteMany();
    await prisma.cleaner.deleteMany();
    await prisma.usuario.deleteMany();

    const { user, token } = await setupDatabase();
    authToken = token;
    authUserId = user.id;

    const cleaner = await prisma.cleaner.create({
      data: {
        name: 'Test Cleaner',
        email: 'cleaner@example.com',
        phone: '1234567890',
      },
    });
    testCleanerId = cleaner.id;
  });

  afterAll(async () => {
    await prisma.booking.deleteMany();
    await prisma.cleaner.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a new booking successfully when authenticated', async () => {
    const res = await request(app)
      .post('/api/booking')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        clientName: 'Test Client',
        clientEmail: 'client@example.com',
        serviceDate: '2026-05-10T10:00:00.000Z',
        notes: 'Some notes',
        cleanerId: testCleanerId,
        serviceType: 'Residential',
      });
    expect(res.statusCode).toEqual(201);
    testBookingId = res.body.id;
  });

  it('should not create a booking without authentication', async () => {
    const res = await request(app)
      .post('/api/booking')
      .send({
        userId: authUserId,
        cleanerId: testCleanerId,
        serviceType: 'Commercial',
        date: '2026-05-11T10:00:00.000Z',
        status: 'Pending',
        totalPrice: 200.00,
      });
    expect(res.statusCode).toEqual(401);
  });
});
